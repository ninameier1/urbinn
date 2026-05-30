'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePublication, deletePublication } from '@/lib/actions/publication-actions';
import { Publication } from '@/types/cms';
import Button from '@/components/Button';

export default function UpdatePublicationForm({ publication, municipalities,}: { publication: Publication; municipalities: { id: number; name: string }[];}) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);

const initialData = {
  title: publication.title,
  author: publication.author,
  description: publication.description,
  url: publication.url ?? '',
  published_at: publication.published_at
    ? new Date(publication.published_at).toISOString().split('T')[0]
    : '',
  municipality_id: publication.municipality_id?.toString() ?? '',
};

const [original, setOriginal] = useState(() => initialData);
const [form, setForm] = useState(() => initialData);

const dirty =
  form.title !== original.title ||
  form.author !== original.author ||
  form.description !== original.description ||
  form.url !== original.url ||
  form.published_at !== original.published_at ||
  form.municipality_id !== original.municipality_id;

  function handleChange( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

function handleCancel() {
  setForm(original);
  setIsEditing(false);
}

  async function handleSave() {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.set('title', form.title);
      fd.set('author', form.author);
      fd.set('description', form.description);
      fd.set('url', form.url);
      fd.set('published_at', form.published_at);
      fd.set('municipality_id', form.municipality_id);
      await updatePublication(publication.id, fd);

      setOriginal({ ...form });

      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = confirm('Weet je zeker dat je deze publicatie wilt verwijderen?');
    if (!confirmed) return;
    setDeleting(true);
    try {
      await deletePublication(publication.id);
      router.push('/cms/publications');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 space-y-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
            Publicatie
          </p>
          <p className="text-sm text-stone-500">Basisinformatie over de publicatie.</p>
        </div>

        <Button
          variant={isEditing ? 'cancel' : 'small'}
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}
        >
          {isEditing ? 'Annuleren' : 'Bewerken'}
        </Button>
      </div>

    {/* VIEW MODE */}
    {!isEditing && (
      <section className="space-y-6">
        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium tracking-widest  uppercase text-accent mb-2">
            Titel
          </p>

          <p className="text-sm leading-7 text-stone-700 whitespace-pre-wrap">
            {form.title || 'Geen titel'}
          </p>
        </div>
        
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
              Auteur(s)
            </p>

            <p className="text-sm text-stone-700">
              {form.author || '—'}
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
              Publicatiedatum
            </p>

            <p className="text-sm text-stone-700">
              {form.published_at || '—'}
            </p>
          </div>


        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 sm:col-span-2">
          <p className="text-xs font-medium tracking-widest  uppercase text-accent mb-3">
            Beschrijving
          </p>

          <p className="text-sm leading-7 text-stone-700 whitespace-pre-wrap">
            {form.description || 'Geen beschrijving'}
          </p>
        </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
              URL / DOI
            </p>

            {form.url ? (
              <a
                href={form.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent underline break-all"
              >
                {form.url}
              </a>
            ) : (
              <p className="text-sm text-stone-400">Geen URL toegevoegd</p>
            )}
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
              Gemeente
            </p>

            <p className="text-sm text-stone-700">
              {municipalities.find(
                (m) => m.id.toString() === form.municipality_id
              )?.name ?? 'Geen gekoppelde gemeente'}
            </p>
          </div>
        </div>

        {saved && (
          <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            Publicatie opgeslagen!
          </div>
        )}
      </section>
    )}

      {/* EDIT MODE */}
      {isEditing && (
        <section className="bg-accent/10 border border-accent rounded-lg p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                Bewerken
              </p>
              <h2 className="text-base font-semibold text-stone-800 mb-1">
                Publicatie "{form.title}" aanpassen
              </h2>
              <p className="text-sm text-stone-500 mb-5">
                Pas de basisinformatie van deze publicatie aan.
              </p>
            </div>
            <Button variant="delete" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Verwijderen...' : 'Verwijder publicatie'}
            </Button>
          </div>

          {/* TITLE */}
          <div>
            <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Titel
            </span>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
            />
          </div>

          {/* AUTHOR */}
          <div>
            <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Auteur(s)
            </span>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
            />
            <p className="text-xs text-muted-foreground mt-1">Meerdere auteurs scheiden met een komma.</p>
          </div>

          {/* PUBLISHED */}
          <div>
            <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Publicatiedatum
            </span>
            <input
              name="published_at"
              type="date"
              value={form.published_at}
              onChange={handleChange}
              className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Beschrijving
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
            />
          </div>

          {/* URL OPTIONAL */}
          <div>
            <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              URL / DOI (optioneel)
            </span>
            <input
              name="url"
              type="url"
              value={form.url}
              onChange={handleChange}
              className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
            />
          </div>

          {/* MUNICIPALITY OPTIONAL */}
          <div>
            <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Gemeente (optioneel)
            </span>
            <select
              name="municipality_id"
              value={form.municipality_id}
              onChange={handleChange}
              className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
            >
              <option value="">— Geen gemeente —</option>
              {municipalities.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Button variant="small" onClick={handleSave} disabled={!dirty || saving}>
              {saving ? 'Opslaan...' : 'Opslaan'}
            </Button>
            {dirty && !saving && (
              <span className="text-sm text-stone-400">Onopgeslagen wijzigingen</span>
            )}
          </div>

          
        </section>
      )}
    </div>
  );
}