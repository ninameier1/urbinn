import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/cms/login')

  return <>
    {children}
  </>
}