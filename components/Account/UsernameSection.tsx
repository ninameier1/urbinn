'use client'

import { useState, useTransition } from 'react'
import { updateUsername } from '@/lib/actions/account-actions'
import { AsyncState } from '@/types/ui'

import Button from '../Button'

export default function UsernameSection({
  currentUsername,
}: {
  currentUsername: string
}) {
  const [username, setUsername] = useState(currentUsername)

  const [state, setState] = useState<AsyncState>({ status: 'idle' })
  const [isPending, startTransition] = useTransition()

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setState({ status: 'idle' })

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        await updateUsername(formData)
        setState({
          status: 'success',
          message: 'Naam bijgewerkt.',
        })
      } catch (err) {
        setState({
          status: 'error',
          message:
            err instanceof Error ? err.message : 'Er ging iets mis.',
        })
      }
    })
  }

  return (
    <section className="bg-white border border-stone-200 rounded-lg p-6">
      <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
        Bewerken
      </p>

      <h2 className="text-base font-semibold text-stone-800 mb-1">
        Verander weergavenaam
      </h2>

      <p className="text-sm text-stone-500 mb-5">
        Kies een nieuwe weergavenaam voor je account.
      </p>

      <form onSubmit={submit}>
        <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-0.5">
          Weergavenaam
        </span>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          className="border p-2 w-full mb-4 text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900 mb-05"
        />

        <Button 
        variant="primary"
        type="submit"
        loading={isPending}
        >
          Opslaan
        </Button>

        {state.status === 'success' && (
          <p className="mt-3 text-sm text-green-600">
            {state.message}
          </p>
        )}

        {state.status === 'error' && (
          <p className="mt-3 text-sm text-red-600">
            {state.message}
          </p>
        )}
      </form>
    </section>
  )
}