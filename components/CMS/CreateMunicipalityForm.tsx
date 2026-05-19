"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createMunicipality } from "@/lib/actions/municipality-actions";
import { uploadImage } from '@/lib/actions/upload-actions';

import ImageUpload from "../ImageUpload";
import Button from "../Button";

interface FormState {
  name: string;
  description: string;
  image: string | null;
}

export default function CreateMunicipalityForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending] = useTransition();

  async function handleImageUpload(file: File) {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.set('image', file);

      const url = await uploadImage(formData);

      setForm((prev) => ({
        ...prev,
        image: url,
      }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("description", form.description);
    if (form.image) formData.set("image", form.image);

    try {
      await createMunicipality(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Er is iets misgegaan.");
    }
  }

  const isBusy = isPending || uploading;

  return (
  <section className="space-y-6">
    {/* MUNICIPALITY CARD */}
    <div className="bg-white border border-stone-200 rounded-lg p-6">
    <form onSubmit={handleSubmit} className="mt-8 max-w-7xl space-y-6">
      {/* Name field */}
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground"
        >
          Naam gemeente <span className="text-destructive">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          placeholder="bijv. Almere"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          disabled={isBusy}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-xs text-muted-foreground">Maximaal 100 tekens.</p>
      </div>

            <div>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Beschrijving
              </span>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={4}
                className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
              />
            </div>

      <ImageUpload
        value={form.image}
        uploading={uploading}
        error={uploadError}
        onChange={handleImageUpload}
        onRemove={() => setForm((p) => ({ ...p, image: null }))}
      />

      {/* Submit error */}
      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={isBusy}
        >
          {isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Opslaan…
            </>
          ) : (
            "Gemeente aanmaken"
          )}
        </Button>

        <Button
          variant="secondary"
          disabled={isBusy}
          onClick={() => router.back()}
      >
          Annuleren
        </Button>
      </div>
    </form>
    </div>
    </section>
  );
}