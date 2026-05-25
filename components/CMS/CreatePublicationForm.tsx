"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createPublication } from "@/lib/actions/publication-actions";
import Button from "../Button";

export interface PublicationFormState {
  title: string;
  author: string;
  description: string;
  url: string;
  published_at: string;
  municipality_id: string;
}

interface CreatePublicationFormProps {
  municipalities: { id: number; name: string }[];
}

export default function CreatePublicationForm({ municipalities }: CreatePublicationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);


  const [publication, setPublication] = useState<PublicationFormState>({
    title: "",
    author: "",
    description: "",
    url: "",
    published_at: "",
    municipality_id: "",
  });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setPublication((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.set("title", publication.title);
        formData.set("author", publication.author);
        formData.set("description", publication.description);
        formData.set("url", publication.url);
        formData.set("published_at", publication.published_at);
        formData.set("municipality_id", publication.municipality_id);

        const publicationId = await createPublication(formData);
        router.push(`/cms/publications/${publicationId}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Er is iets misgegaan.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
            Publicatie
          </p>
          <h2 className="text-base font-semibold text-stone-800 mb-1">
            Publicatie informatie
          </h2>
          <p className="text-sm text-stone-500">Basisinformatie over de publicatie</p>
        </div>

        <div className="mt-8 max-w-7xl space-y-6">
          {/* TITLE */}
          <div className="space-y-1.5">
            <label htmlFor="title" className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Titel <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              maxLength={100}
              placeholder="bijv. Onderzoek naar inclusiviteit in Almere"
              value={publication.title}
              onChange={handleChange}
              disabled={isPending}
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
          {/* AUTHOR */}
          <div className="space-y-1.5">
            <label htmlFor="author" className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Auteur(s) <span className="text-destructive">*</span>
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              maxLength={100}
              placeholder="bijv. J. de Vries, A. Bakker"
              value={publication.author}
              onChange={handleChange}
              disabled={isPending}
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground">Meerdere auteurs scheiden met een komma.</p>
          </div>

              {/* PUBLISHED */}
              <div className="space-y-1.5">
                <label
                  htmlFor="published_at"
                  className="text-xs font-medium tracking-wide uppercase text-accent block mb-1"
                >
                  Publicatiedatum <span className="text-destructive">*</span>
                </label>

                <input
                  id="published_at"
                  name="published_at"
                  type="date"
                  value={publication.published_at}
                  onChange={handleChange}
                  disabled={isPending}
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

          {/* DESCRIPTION */}
          <div className="space-y-1.5">
            <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
              Beschrijving <span className="text-destructive">*</span>
            </span>
            <textarea
              name="description"
              required
              placeholder="Korte beschrijving van de publicatie..."
              value={publication.description}
              onChange={handleChange}
              rows={4}
              disabled={isPending}
              className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>


          {/* OPTIONAL */}
          <details className="bg-accent/10 border border-accent rounded-lg overflow-hidden group">
            <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-accent mb-1">
                  Optionele informatie
                </p>


                <p className="text-sm text-stone-500">
                  URL en gekoppelde gemeente.
                </p>
              </div>

              <span className="text-sm text-accent font-medium group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>

            <div className="px-6 pb-6 space-y-6">
              {/* URL */}
              <div className="space-y-1.5">
                <label
                  htmlFor="url"
                  className="text-xs font-medium tracking-wide uppercase text-accent block mb-1"
                >
                  URL / DOI
                </label>

                <input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://..."
                  value={publication.url}
                  onChange={handleChange}
                  disabled={isPending}
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* MUNICIPALITY */}
              <div className="space-y-1.5">
                <label
                  htmlFor="municipality_id"
                  className="text-xs font-medium tracking-wide uppercase text-accent block mb-1"
                >
                  Gemeente
                </label>

                <select
                  id="municipality_id"
                  name="municipality_id"
                  value={publication.municipality_id}
                  onChange={handleChange}
                  disabled={isPending}
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">— Geen gemeente —</option>

                  {municipalities.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </details>
          
        </div>
      </div>


      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Opslaan…
            </>
          ) : (
            "Publicatie aanmaken"
          )}
        </Button>

        <Button type="button" variant="cancel" disabled={isPending} onClick={() => router.back()}>
          Annuleren
        </Button>
      </div>
    </form>
  );
}