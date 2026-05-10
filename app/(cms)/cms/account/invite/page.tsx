'use client'

import { useActionState } from 'react'
import { inviteUser } from '@/lib/actions/invite-actions'
import Button from '@/components/Button'

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
    <div className="max-w-lg mx-auto mt-16 px-4">
      <div className="bg-primary border border-gray-200 shadow-2xl rounded-2xl p-10">

        <h2 className="mb-8 text-4xl text-center tracking-widest text-white font-medium uppercase">
          Gebruiker uitnodigen
        </h2>

        {state.ok && (
          <p className="text-sm text-center text-green-300 mb-4">
            Uitnodiging verstuurd!
          </p>
        )}

        {state.error && (
          <p className="mb-4 text-sm text-center text-red-300">
            {state.error}
          </p>
        )}

        <form action={action} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-white mb-1.5">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="naam@windesheim.nl"
              required
              disabled={pending}
              className="w-full h-[32px] bg-white rounded-sm text-base px-2"
            />
          </div>

          <Button type="submit" variant="secondary" disabled={pending}>
            {pending ? 'Versturen...' : 'Stuur uitnodiging'}
          </Button>
        </form>
      </div>
    </div>
  )
}