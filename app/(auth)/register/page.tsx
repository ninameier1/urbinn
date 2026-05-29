import { validateInviteToken } from '@/lib/actions/invite-actions'
import { RegisterClient } from '@/components/Account/RegisterClient'

import AuthCard from '@/components/Account/AuthCard'

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  if (!token) {
    return (
      <AuthCard>
        <p className="text-sm text-center text-red-300">
          Geen uitnodigingslink gevonden.
        </p>
      </AuthCard>
    )
  }

  try {
    const { email } = await validateInviteToken(token)

    return (
      <AuthCard>
        <RegisterClient token={token} email={email} />
      </AuthCard>
    )
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Onbekende fout'

    return (
      <AuthCard>
        <p className="text-sm text-center text-red-300">
          {message}
        </p>
      </AuthCard>
    )
  }
}