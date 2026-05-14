const ALLOWED_EMAIL_DOMAINS = [
  'windesheim.nl',
  'vu.nl',
]

export function isAllowedEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase()
  if (!domain) return false

  return ALLOWED_EMAIL_DOMAINS.includes(domain)
}