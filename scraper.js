const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

const app = express()
const PORT = 3000

app.get('/api/parse', async (req, res) => {
    const {
        url,
        product,
        title,
        price,
        image,
        id,
        maxPages = 1,
        pageParam = 'PAGEN_1'
    } = req.query

    if (!url || !product) {
        return res.status(400).json({ error: 'Missing required query parameters: url and product' })
    }

    const products = []

    for (let page = 1; page <= Number(maxPages); page++) {
        const separator = url.includes('?') ? '&' : '?'
        const pageUrl = `${url}${separator}${pageParam}=${page}`

        try {
            const { data } = await axios.get(pageUrl, {
                headers: {
                    'User-Agent':
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36'
                }
            })

            const $ = cheerio.load(data)

            $(product).each((_, element) => {
                const $el = $(element)
                const item = {}

                if (title) {
                    item.title =
                        $el.find(title).attr('data-itemname') ||
                        $el.find(title).text().trim() ||
                        ''
                }

                if (price) {
                    item.price =
                        $el.find(price).attr('content') ||
                        $el.find(price).text().trim() ||
                        ''
                }

                if (image) {
                    item.image = $el.find(image).attr('src') || ''
                }

                if (id) {
                    item.id =
                        $el.find(id).attr('data-itemid') ||
                        $el.find(id).text().trim() ||
                        ''
                }

                products.push(item)
            })
        } catch (error) {
            console.error(error.message)
        }
    }

    fs.writeFileSync('result.json', JSON.stringify(products, null, 2), 'utf8')

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(products, null, 2))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})