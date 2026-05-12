export default function AccountInfoSection({ email }: { email: string }) {
  return (
    <section className="bg-white border border-stone-200 rounded-lg p-6">
      <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
        Profiel
      </p>

      <h2 className="text-base font-semibold text-stone-800 mb-1">
        Account gegevens
      </h2>

      <p className="text-sm text-stone-500 mb-4">
        Huidige account gegevens.
      </p>

      <div className="bg-stone-50 border border-stone-200 rounded-md px-4 py-3">
        <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-0.5">
          E-mail adres
        </span>
        <span className="text-sm text-stone-600">{email}</span>
      </div>
    </section>
  )
}