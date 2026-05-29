'use client'

import { useActionState } from 'react';
import { inviteUser } from '@/lib/actions/invite-actions';

import InviteSection from '@components/Account/InviteSection';
import TitleSection from '@/components/Sections/TitleSection';

type State = {
  ok: boolean
  error: string | null
}

const initialState: State = {
  ok: false,
  error: null,
}

export default function InvitePage() {
  const [state, action, pending] = useActionState<State, FormData>(
    async (_, formData) => {
      const email = (formData.get('email') as string)
        .toLowerCase()
        .trim()

      try {
        await inviteUser(email)
        return { ok: true, error: null }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : 'Oepsie! Er ging iets mis'

        return { ok: false, error: message }
      }
    },
    initialState
  )

  return (
    <>
    <TitleSection />
    <InviteSection
      state={state}
      action={action}
      pending={pending}
    />
    </>
  )
}