'use client'

import { useActionState } from 'react'
import { handleLogin } from '@/lib/actions/account-actions'

import Button from '@/components/Button'
import AuthCard from '@/components/AuthCard'

export default function LoginPage() {
  const [state, action, pending] = useActionState(handleLogin, null)

  return (
    <AuthCard>
      {state?.ok && (
        <p className="mb-4 text-sm text-center text-green-300">
          Magic Link is verstuurd.
        </p>
      )}
      {state?.error === 'not-invited' && (
        <p className="mb-4 text-sm text-center text-red-300">
          Dit e-maildres is ongeldig.
        </p>
      )}
      {state?.error === 'account-deleted' && (
        <p className="mb-4 text-sm text-center text-red-300">
          Account bestaat niet meer.
        </p>
      )}
      {state?.error === 'sign-in-failed' && (
        <p className="mb-4 text-sm text-center text-red-300">
          Inloggen mislukt. Probeer het opnieuw.
        </p>
      )}
      {state?.error === 'missing-email' && (
        <p className="mb-4 text-sm text-center text-red-300">
          Vul een e-mailadres in.
        </p>
      )}
      <form action={action} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm text-white mb-1.5" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="naam@windesheim.nl"
            required
            className="w-full h-[32px] bg-white rounded-sm text-base px-2"
          />
        </div>
        <Button variant="secondary" type="submit" disabled={pending}>
          {pending ? 'Sending...' : 'Send magic link'}
        </Button>
      </form>
    </AuthCard>
  )
}