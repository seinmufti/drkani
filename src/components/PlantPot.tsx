type PlantPotProps = {
  variant?: 'leafy' | 'trail' | 'round' | 'small'
  className?: string
}

const sources = {
  leafy: '/plants/left.png?v=leaves',
  round: '/plants/middle.png',
  trail: '/plants/right.png?v=stem',
  small: '/plants/small.png?v=leaves',
} as const

const labels = {
  leafy: 'White pot with leafy plant',
  round: 'White pot with round plant',
  trail: 'White pot with tall stemmed plant',
  small: 'White pot with small plant',
} as const

export function PlantPot({ variant = 'leafy', className }: PlantPotProps) {
  return (
    <img
      className={className}
      src={sources[variant]}
      alt=""
      aria-hidden="true"
      title={labels[variant]}
      draggable={false}
    />
  )
}
