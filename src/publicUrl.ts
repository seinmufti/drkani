/** Prefix public files with Vite `base` (e.g. `/drkani/`). */
export function publicUrl(path: string): string {
  const trimmed = path.replace(/^\//, "")
  const [file, query] = trimmed.split("?")
  const url = `${import.meta.env.BASE_URL}${file}`
  return query ? `${url}?${query}` : url
}
