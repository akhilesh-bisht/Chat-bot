export default function TailwindButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center px-6 py-2 rounded-lg font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
