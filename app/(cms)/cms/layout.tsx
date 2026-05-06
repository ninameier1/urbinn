import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen">
      {children}
    </div>
  )
}
