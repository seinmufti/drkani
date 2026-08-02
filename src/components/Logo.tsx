type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={`logo ${className ?? ''}`.trim()} aria-hidden="true">
      kani
    </span>
  )
}
