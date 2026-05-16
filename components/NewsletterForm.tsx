'use client'

export default function NewsletterForm() {
  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="jouw@email.nl"
        className="w-full bg-background/10 border border-background/20 text-background placeholder:text-background/40 rounded-full px-5 py-3 text-sm outline-none focus:border-primary"
      />
      <button
        type="submit"
        className="w-full bg-primary text-background rounded-full py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
      >
        Aanmelden →
      </button>
      <p className="text-[11px] text-background/35 text-center">
        Geen spam. Afmelden kan altijd.
      </p>
    </form>
  )
}