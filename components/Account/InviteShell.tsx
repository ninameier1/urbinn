'use client'

import { useActionState, useEffect } from 'react';
import { inviteUser } from '@/lib/actions/invite-actions';
import { useRouter } from 'next/navigation';

import InviteSection from '@components/Account/InviteSection';
import TitleSection from '@/components/Sections/TitleSection';

type State = {
  ok: boolean
  error: string | null
  refreshed?: boolean
}

const initialState: State = {
  ok: false,
  error: null,
}

export default function InviteShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, action, pending] = useActionState<State, FormData>(
  async (_, formData) => {
    const email = (formData.get('email') as string).toLowerCase().trim()
    try {
      const result = await inviteUser(email)
      return { ok: true, error: null, refreshed: result.refreshed }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Oepsie! Er ging iets mis'
      return { ok: false, error: message }
    }
  },
    initialState
  )

  useEffect(() => {
    if (state.ok) {
      router.refresh()
    }
  }, [state.ok])

  return (
    <>
      <TitleSection />
      <InviteSection state={state} action={action} pending={pending} />
      {children}
    </>
  )
}