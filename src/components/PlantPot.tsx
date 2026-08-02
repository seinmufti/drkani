type PlantPotProps = {
  variant?: 'leafy' | 'trail' | 'round'
  className?: string
}

export function PlantPot({ variant = 'leafy', className }: PlantPotProps) {
  if (variant === 'trail') {
    return (
      <svg
        className={className}
        viewBox="0 0 90 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M28 18C22 30 20 44 24 58C18 50 12 40 16 28C20 18 26 14 28 18Z"
          fill="#7d8f7a"
        />
        <path
          d="M46 8C40 22 42 42 48 60C54 42 58 24 52 12C50 8 48 6 46 8Z"
          fill="#6f826c"
        />
        <path
          d="M62 20C68 34 70 48 66 62C72 54 78 42 74 30C70 20 64 16 62 20Z"
          fill="#879987"
        />
        <path
          d="M22 68H68L64 108H26L22 68Z"
          fill="#f7f7f7"
          stroke="#d8d8d8"
          strokeWidth="1.2"
        />
        <path d="M20 68H70V74H20V68Z" fill="#efefef" stroke="#d4d4d4" strokeWidth="1" />
        <path d="M28 82H62" stroke="#e4e4e4" strokeWidth="1" />
      </svg>
    )
  }

  if (variant === 'round') {
    return (
      <svg
        className={className}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse cx="50" cy="34" rx="28" ry="22" fill="#7a8c76" />
        <ellipse cx="36" cy="40" rx="14" ry="12" fill="#6d7f69" />
        <ellipse cx="64" cy="40" rx="14" ry="12" fill="#879887" />
        <path
          d="M28 56C28 56 26 96 28 100C30 104 70 104 72 100C74 96 72 56 72 56H28Z"
          fill="#f8f8f8"
          stroke="#d6d6d6"
          strokeWidth="1.2"
        />
        <ellipse cx="50" cy="56" rx="24" ry="7" fill="#efefef" stroke="#d4d4d4" strokeWidth="1" />
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 110 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M55 8C48 20 40 34 42 52C34 40 28 28 34 16C40 8 50 4 55 8Z"
        fill="#748672"
      />
      <path
        d="M55 6C60 18 68 34 66 54C74 42 82 28 76 16C72 8 60 4 55 6Z"
        fill="#879987"
      />
      <path
        d="M55 18C50 32 48 48 52 64C44 54 38 42 42 30C46 20 52 16 55 18Z"
        fill="#6d7f69"
      />
      <path
        d="M32 68H78L72 118H38L32 68Z"
        fill="#f7f7f7"
        stroke="#d8d8d8"
        strokeWidth="1.2"
      />
      <path d="M30 68H80V75H30V68Z" fill="#efefef" stroke="#d4d4d4" strokeWidth="1" />
      <path d="M40 88H70" stroke="#e5e5e5" strokeWidth="1" />
      <path d="M42 98H68" stroke="#e5e5e5" strokeWidth="1" />
    </svg>
  )
}
