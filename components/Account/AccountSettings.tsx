import InfoSection from './InfoSection'
import UsernameSection from './UsernameSection'
import DeleteAccountSection from './DeleteSection'
import TitleSection from '../Sections/TitleSection'

export default function AccountSettings({
  currentUsername,
  email,
}: {
  currentUsername: string
  email: string
}) {
  return (
    <div className="flex flex-col gap-6">
        <TitleSection />
        <InfoSection email={email} />
        <UsernameSection currentUsername={currentUsername} />
        <DeleteAccountSection />
    </div>
  )
}