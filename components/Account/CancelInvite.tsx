'use client'

import { useRouter } from 'next/navigation'
import { cancelInvite } from '@/lib/actions/invite-actions'

import Button from '../Button'

export default function CancelInvite({ id }: { id: number }) {
  const router = useRouter()
  
  return (
    <Button
      variant="delete"
      onClick={async () => {
        await cancelInvite(id)
        router.refresh()
      }}
    >
      Annuleren
    </Button>
  )
}