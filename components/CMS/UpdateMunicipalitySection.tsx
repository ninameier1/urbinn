'use client';

import Image from 'next/image';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateMunicipality, deleteMunicipality } from '@/lib/actions/municipality-actions';
import { Municipality } from '@/types/cms';
import { uploadImage } from '@/lib/actions/upload-actions';

import Button from '@/components/Button';
import ImageUpload from "../ImageUpload";


export default function UpdateMunicipalitySection({ municipality }: { municipality: Municipality }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const initialData = {
    name: municipality.name,
    description: municipality.description ?? '',
    image: municipality.image ?? null,
  };

  const [original, setOriginal] = useState(() => initialData);
  const [form, setForm] = useState(() => initialData);

  const dirty =
    form.name !== original.name ||
    form.description !== original.description ||
    form.image !== original.image;

  function handleCancel() {
    setForm(original);
    setIsEditing(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.set('name', form.name);
      if (form.description) fd.set('description', form.description);
      if (form.image) fd.set('image', form.image);
      await updateMunicipality(municipality.id, fd);

      setOriginal({ ...form });

      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

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


  async function handleDelete() {
    const confirmed = confirm('Weet je zeker dat je deze gemeente wilt verwijderen?');
    if (!confirmed) return;

    setDeleting(true);

    try {
      await deleteMunicipality(municipality.id);

      router.push('/cms/municipalities');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="space-y-6">
      {/* MUNICIPALITY CARD */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
              Gemeente
            </p>
            <p className="text-sm text-stone-500">
              Basisinformatie en beschrijving
            </p>
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
                Naam gemeente
              </p>

              <p className="text-sm leading-7 text-stone-700 whitespace-pre-wrap">
                {form.name || 'Geen gemeente'}
              </p>
            </div>


        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
          <p className="text-xs font-medium tracking-widest  uppercase text-accent mb-3">
            Beschrijving
          </p>

          <p className="text-sm leading-7 text-stone-700 whitespace-pre-wrap">
            {form.description || 'Geen beschrijving'}
          </p>
        </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="text-xs font-medium tracking-widest  uppercase text-accent mb-3">
              Foto
            </p>
            {form.image && (
              <Image
                src={form.image}
                alt={form.name}
                width={260}
                height={160}
                className="rounded-md border object-cover"
              />
            )}
          </div>
        
        {saved && <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
              Opgeslagen!
          </p>}

          </section>
        )}

        {/* EDIT MODE */}
        {isEditing && (
        <section className="bg-accent/10 border border-accent rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                  Bewerken
                </p>
                <h2 className="text-base font-semibold text-stone-800 mb-1">
                  Gemeente "{ form.name }" aanpassen
                </h2>
                <p className="text-sm text-stone-500 mb-5">
                  Pas de basisinformatie van deze gemeente aan.
                </p>
              </div>
            <Button variant="delete" onClick={handleDelete} disabled={deleting}>
              {deleting ? 'Verwijderen...' : 'Verwijder gemeente'}
            </Button>
            </div>

            <div>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Naam
              </span>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
              />
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

            {/* Image upload field */}
            <ImageUpload
              value={form.image}
              uploading={uploading}
              error={uploadError}
              onChange={handleImageUpload}
              onRemove={() => setForm((p) => ({ ...p, image: null }))}
            />
          
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
    </section>
  );
}
