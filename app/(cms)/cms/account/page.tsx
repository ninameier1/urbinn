// export default function AccountPage() {
//   return (
//     <main className="container mx-auto px-6 py-20">
//       <h1 className="text-3xl font-bold">Account</h1>
//       <p className="text-muted-foreground mt-4">Binnenkort beschikbaar.</p>
//     </main>
//   );
// }

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