import md5 from 'md5'

export function getGravatarUrl(
  email: string,
  options?: { size?: number; defaultImage?: string },
) {
  const hash = md5(email.trim().toLowerCase())
  const size = options?.size ?? 80
  const defaultImage = options?.defaultImage ?? '404'
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=${defaultImage}`
}
