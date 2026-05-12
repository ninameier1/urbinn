import InfoSection from './InfoSection'
import UsernameSection from './UsernameSection'
import DeleteAccountSection from './DeleteSection'

export default function AccountSettings({
  currentUsername,
  email,
}: {
  currentUsername: string
  email: string
}) {
  return (
    <div className="py-12 mb-12 w-full min-h-[90vh]">
      <div className="container mx-auto px-4 space-y-6">
        <div className="pb-6 border-b border-stone-200">
          <h1 className="text-3xl font-semibold tracking-tight">
            Account instellingen
          </h1>
        </div>

        <InfoSection email={email} />
        <UsernameSection currentUsername={currentUsername} />
        <DeleteAccountSection />
      </div>
    </div>
  )
}