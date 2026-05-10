'use client'

import { useActionState } from 'react'
import { completeRegistration } from '@/lib/actions/invite-actions'
import { signIn } from 'next-auth/react'

import Button from '@/components/Button'

type State = {
  ok: boolean
  error: string | null
}

const initialState: State = {
  ok: false,
  error: null,
}

type RegisterProps = {
  token: string
  email: string
}

export function RegisterClient({ token, email }: RegisterProps) {
  const [state, action, pending] = useActionState<State, FormData>(
    async (_, formData) => {
      const username = (formData.get('username') as string).trim()

      try {
        const res = await completeRegistration(token, username)

        await signIn('resend', {
          email: res.email,
          redirect: true,
          callbackUrl: '/cms',
        })

        return { ok: true, error: null }
      } catch (err: any) {
        return { ok: false, error: err.message }
      }
    },
    initialState
  )

  return (
    <>
      {!state?.ok ? (
        <>
          <p className="mb-6 text-sm text-center text-white/60">
            Je bent uitgenodigd als{' '}
            <span className="text-white">{email}</span>
            <br />
            Kies een gebruikersnaam om verder te gaan.
          </p>

          {state?.error && (
            <p className="mb-4 text-sm text-center text-red-300">
              {state.error}
            </p>
          )}

          <form action={action} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-white mb-1.5">
                Naam
              </label>

              <input
                name="username"
                type="text"
                required
                minLength={3}
                maxLength={30}
                autoComplete="off"
                className="w-full h-[32px] bg-white rounded-sm text-base px-2"
              />
            </div>

            <Button type="submit" variant="secondary" disabled={pending}>
              {pending ? 'Account aanmaken...' : 'Account aanmaken'}
            </Button>
          </form>
        </>
      ) : (
        <p className="text-sm text-center text-green-300">
          Account aangemaakt! Je kunt nu inloggen met je email.
        </p>
      )}
    </>
  )
}