export { auth as middleware } from '@/auth'

export const config = { // keep it secret, keep it safe
  matcher: ['/cms/:path*'],
}
