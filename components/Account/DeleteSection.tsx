'use client'

import { useRef, useState, useTransition } from 'react'
import { deleteAccount } from '@/lib/actions/account-actions'
import { AsyncState } from '@/types/ui'

export default function DeleteAccountSection() {
  const [state, setState] = useState<AsyncState>({ status: 'idle' });
  const [confirmInput, setConfirmInput] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const canDelete = confirmInput === 'DELETE';

  const [isPending, startTransition] = useTransition();
  const confirmRef = useRef<HTMLInputElement>(null);

  const open = () => {
    setShowConfirm(true)
    setConfirmInput('')
    setState({ status: 'idle' })

    setTimeout(() => confirmRef.current?.focus(), 50)
  };

  const cancel = () => {
    setShowConfirm(false)
    setConfirmInput('')
    setState({ status: 'idle' })
  };

  const confirm = () => {
    if (confirmInput !== 'DELETE') {
      setState({
        status: 'error',
        message: 'Typ DELETE om te bevestigen.',
      })
      return
    };

    startTransition(async () => {
      try {
        await deleteAccount()

        setState({
          status: 'success',
          message: 'Account verwijderd.',
        })
      } catch (err) {
        setState({
          status: 'error',
          message:
            err instanceof Error ? err.message : 'Er ging iets mis.',
        })
      }
    })
  };

  return (
    <section className="bg-red-50 border border-red-200 rounded-lg p-6">
      <p className="text-xs font-medium tracking-widest uppercase text-red-400 mb-4">
        Waarschuwing
      </p>

      <h2 className="text-base font-semibold text-stone-800 mb-1">
        Verwijder account
      </h2>

      <p className="text-sm text-stone-500 mb-5">
        Verwijder je account. Dit is permanent. De inhoud die je hebt aangemaakt (gemeenten, kernelementen, factoren, mechanismen) blijft behouden, maar wordt losgekoppeld van je profiel.
      </p>

      {!showConfirm ? (
        <button
          onClick={open}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-red-600 text-xs font-medium tracking-wide uppercase rounded-md border border-red-300 cursor-pointer hover:bg-red-600 hover:text-white hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Verwijder account
        </button>
      ) : (
        <div className="bg-white border border-red-200 rounded-md p-4 space-y-4">
          <p className="text-sm text-red-800 leading-relaxed">
            <strong className="block mb-1">Weet je het zeker?</strong>
            Typ{' '}
            <code className="bg-red-100 px-1 py-0.5 rounded text-xs font-mono">
              DELETE
            </code>{' '}
            om de definitieve verwijdering van je account te bevestigen.
          </p>

          <div>
            <label
              htmlFor="confirm-delete"
              className="block text-xs font-medium tracking-wide uppercase text-stone-500 mb-1.5"
            >
              Bevestigen
            </label>

            <input
              id="confirm-delete"
              ref={confirmRef}
              type="text"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
              placeholder="DELETE"
              disabled={isPending}
              autoComplete="off"
              spellCheck={false}
              className="w-full text-sm px-3 py-2 bg-stone-50 border border-stone-300 rounded-md text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition font-mono"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={confirm}
              disabled={isPending || !canDelete}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-medium tracking-wide uppercase rounded-md cursor-pointer hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? 'Verwijderen…' : 'Verwijderen'}
            </button>

            <button
              type="button"
              onClick={cancel}
              disabled={isPending}
              className="inline-flex items-center px-4 py-2 bg-transparent text-stone-600 text-xs font-medium tracking-wide uppercase rounded-md border border-stone-300 cursor-pointer hover:border-stone-500 hover:text-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Annuleren
            </button>
          </div>

          {state.status === 'error' && (
            <p className="mt-3 text-sm text-red-600">
              {state.message}
            </p>
          )}

          {state.status === 'success' && (
            <p className="mt-3 text-sm text-green-600">
              {state.message}
            </p>
          )}
        </div>
      )}
    </section>
  )
}