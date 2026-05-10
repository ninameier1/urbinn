export { auth as proxy } from "@/auth"

export const config = { // for cleaner UX, not just security
  matcher: ['/cms/:path*'],
}