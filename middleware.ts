export { auth as middleware } from '@/lib/auth'

export const config = {
  matcher: ['/cms/:path*'],   // keep it secret, keep it safe
}

