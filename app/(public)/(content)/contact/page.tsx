import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact",
}

export const revalidate = 60;

const contacts = [
  {
    role: "Consortiumcoördinator",
    name: "Dr. Ir. Ingrid Bakker",
    email: "i.bakker@windesheim.nl",
    organisation: "Windesheim Flevoland",
  },
  {
    role: "Onderzoeksleider VU",
    name: "Prof. dr. Carry Renders",
    email: "carry.renders@vu.nl",
    organisation: "Vrije Universiteit Amsterdam",
  },
]

export default async function ContactPage() {
  return (
    <div className="space-y-8 mt-8">

      <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-4">
            Contact
          </span>
          <h1 className="text-3xl font-serif font-semibold text-dark mb-4">
            Doe mee aan GLOW-XL
          </h1>
          <p className="text-sm text-stone-500 leading-7 max-w-7xl">
            Bent u geïnteresseerd in deelname aan het consortium, een samenwerking als praktijkpartner, of wilt u meer weten over het onderzoek? Neem dan contact op met een van de betrokkenen hieronder.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-white border border-stone-200 rounded-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-stone-200">
          <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-4">
            Contactpersonen
          </span>
          <h2 className="text-2xl font-serif font-semibold text-dark">
            Met wie kunt u contact opnemen?
          </h2>
        </div>
        <div className="divide-y divide-stone-200">
          {contacts.map((contact) => (
            <div key={contact.email} className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-medium tracking-widest uppercase text-accent block mb-2">
                  {contact.role}
                </span>
                <p className="text-base font-semibold text-dark">{contact.name}</p>
                <p className="text-sm text-stone-400">{contact.organisation}</p>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-primary hover:text-accent transition-colors shrink-0"
              >
                {contact.email}
              </a>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}