import { useState } from 'react'
import { isAllowedEmail } from '@/utils/emails'

import Button from '../Button'


type State = {
  ok: boolean
  error: string | null
}

type InviteProps = {
  state: State
  action: (formData: FormData) => void
  pending: boolean
}

export default function InviteSection({ state, action, pending }: InviteProps) {
    const [ack, setAck] = useState(false);
    const [email, setEmail] = useState('');
    const isAllowed = isAllowedEmail(email)

  return (
    <section className="bg-white border border-stone-200 rounded-lg p-6">

          <h1 className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
            Uitnodigen
          </h1>
        
        <h2 className="text-base font-semibold text-stone-800 mb-1">
            Nieuwe admin uitnodigen
        </h2>

        <p className="text-sm text-stone-500 mb-4">
            Nodig iemand uit om een admin te worden. 
            Deze persoon krijgt volledige toegang tot het gehele CMS van Let's GLOW Flevoland. 
            Wees voorzichtig met wie je uitnodigd.
        </p>

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

        {email && !isAllowed && (
        <p className="text-sm text-red-500 mb-3">
            Alleen @windesheim.nl (en toekomstige partners) zijn toegestaan.
        </p>
        )}

        <form action={action}>
        <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-0.5">
          E-mail adres
        </span>

            <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="naam@windesheim.nl"
            required
            disabled={pending}
            className="border p-2 w-full mb-4 text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
            />

            <label className="flex items-start gap-2 text-sm text-stone-600 mb-4">
            <input
                type="checkbox"
                checked={ack}
                onChange={(e) => setAck(e.target.checked)}
                className="mt-1"
            />
            <span>
                Ik begrijp dat deze gebruiker volledige toegang krijgt tot het CMS en dat ik verantwoordelijk ben voor deze uitnodiging.
            </span>
            </label>

            <Button
                type="submit"
                variant="secondary"
                disabled={pending || !ack || !isAllowed}
                >
            {pending ? 'Versturen...' : 'Stuur uitnodiging'}
          </Button>
        </form>

    </section>
  )
}