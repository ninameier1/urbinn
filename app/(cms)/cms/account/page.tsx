import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

import AccountSettings from '@/components/Account/AccountSettings'

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const userId = Number(session.user.id)

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { username: true, email: true },
  })

  if (!user) redirect('/login')

  return (
    <AccountSettings
      currentUsername={user.username}
      email={user.email}
    />
  )
}