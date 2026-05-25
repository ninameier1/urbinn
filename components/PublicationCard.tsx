type PublicationCardProps = {
  publication: {
    title: string;
    author: string;
    description: string;
    url?: string | null;
    published_at?: string | Date | null;
    municipality?: string | null;
  };
};

export default function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <section className="bg-white border border-stone-200 rounded-lg p-6 space-y-6">

        <div className="mb-4">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
            Publicatie
          </p>
          <p className="text-sm text-stone-500">Basisinformatie over de publicatie.</p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium tracking-widest  uppercase text-accent mb-2">
            Titel
          </p>

          <p className="text-sm leading-7 text-stone-700 whitespace-pre-wrap">
            {publication.title || 'Geen titel'}
          </p>
        </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
            Auteur(s)
          </p>

          <p className="text-sm text-stone-700">
            {publication.author || '—'}
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
            Publicatiedatum
          </p>

          <p className="text-sm text-stone-700">
            {publication.published_at
              ? new Date(publication.published_at).toLocaleDateString('nl-NL')
              : '—'}
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 sm:col-span-2">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-3">
            Beschrijving
          </p>

          <p className="text-sm leading-7 text-stone-700 whitespace-pre-wrap">
            {publication.description || 'Geen beschrijving'}
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
            URL / DOI
          </p>

          {publication.url ? (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent underline break-all"
            >
              {publication.url}
            </a>
          ) : (
            <p className="text-sm text-stone-400">
              Geen URL toegevoegd
            </p>
          )}
        </div>

        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
            Gemeente
          </p>

          <p className="text-sm text-stone-700">
            {publication.municipality || 'Geen gekoppelde gemeente'}
          </p>
        </div>
      </div>
    </section>
  );
}