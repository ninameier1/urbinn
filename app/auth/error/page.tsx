import Button from "@/components/Button";
import AuthCard from "@/components/AuthCard";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  const message =
    error === 'Verification'
      ? 'Deze link is al gebruikt of verlopen. Vraag een nieuwe aan.'
      : 'Er ging iets mis. Probeer opnieuw in te loggen.'

  return (
    <AuthCard>
      <p className="mb-6 text-sm text-center text-red-300">{message}</p>
      <Button href="/login" variant="secondary" className="w-full">
        Terug naar inloggen
      </Button>
    </AuthCard>
  )
}