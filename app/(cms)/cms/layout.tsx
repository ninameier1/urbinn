import { auth } from '@/auth'
import { redirect } from 'next/navigation'

import LayoutShell from '@/components/LayoutShell'
import CmsNav from '@/components/CmsNav'

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) redirect('/login')

  const userLabel =
    session.user?.name?.trim() ||
    session.user?.email?.trim() ||
    'gebruiker'

  return (
    <LayoutShell
      background="bg-secondary/50"
      nav={<CmsNav userLabel={userLabel} />}
    >
        <div className="py-12 mb-12 relative w-full min-h-[90vh]">
          <div className="container mx-auto px-4">
            { children }
          </div>
        </div>
    </LayoutShell>
  )
}