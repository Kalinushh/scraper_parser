type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function ButtonUI({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>
}
