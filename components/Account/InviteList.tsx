import { getInvites } from '@/lib/actions/invite-actions'
import CancelInvite from './CancelInvite'

export default async function InviteList() {
  const invites = await getInvites()

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-dark">
        Verstuurde uitnodigingen
      </h2>

      <div className="mt-6 overflow-x-auto rounded-lg border border-stone-200">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-gray-100">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-accent">
                E-mail
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-accent">
                Uitgenodigd door
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-accent">
                Verstuurd op
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-accent">
                Status
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-accent">
                Actie
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 bg-white">
            {invites.map((invite) => {
              const status = invite.usedAt
                ? 'Geregistreerd'
                : invite.expiresAt < new Date()
                ? 'Verlopen'
                : 'In afwachting'

              return (
                <tr
                  key={invite.id}
                  className="transition-colors hover:bg-stone-50"
                >
                  <td className="px-4 py-3 font-medium text-secondary">
                    {invite.email}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {invite.invitedBy?.deletedAt
                      ? `${invite.invitedBy.username} (verwijderd)`
                      : invite.invitedBy?.username ?? '—'}
                  </td>

                  <td className="px-4 py-3 text-stone-500">
                    {invite.createdAt.toLocaleDateString('nl-NL')}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        status === 'Geregistreerd'
                          ? 'bg-green-100 text-green-700'
                          : status === 'Verlopen'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {status}
                    </span>
                  </td>

                    <td className="px-4 py-3">
                    {status === 'In afwachting' 
                        ? <CancelInvite id={invite.id} />
                        : <span className="text-xs text-stone-400">Geen acties mogelijk</span>
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {invites.length === 0 && (
        <p className="mt-4 text-sm text-stone-500">
          Er zijn nog geen uitnodigingen verstuurd.
        </p>
      )}
    </section>
  )
}