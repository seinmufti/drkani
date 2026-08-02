type NordlysMarkProps = {
  className?: string
}

export function NordlysMark({ className }: NordlysMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="24" rx="4" fill="#2a2a2a" />
      <path
        d="M3 17C7 12.5 10 10 13.5 11.5C17 13 19 16 22.5 14C26 12 29 8.5 33 7"
        stroke="#cfcfcf"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M3 19.5C8 15 11.5 13.5 15 14.8C18.5 16.1 20.5 18.5 24 16.8C27.5 15.1 30 11.5 33 10"
        stroke="#9a9a9a"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M4 14C8.5 9.8 12 8 15.5 9.2C19 10.4 21 13.2 24.5 11.4C28 9.6 30.5 6.8 33 5.5"
        stroke="#f2f2f2"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="8" cy="6" r="0.7" fill="#ececec" />
      <circle cx="14" cy="4.5" r="0.55" fill="#d8d8d8" />
      <circle cx="27" cy="5" r="0.6" fill="#e8e8e8" />
    </svg>
  )
}
