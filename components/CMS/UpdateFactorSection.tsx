'use client';

import { useState } from 'react';
import { updateFactor, deleteFactor } from '@/lib/actions/factor-actions';
import { Factor } from '@/types/cms';

import Button from '@/components/Button';

export default function UpdateFactorSection({ factor }: { factor: Factor }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const initialData = {
    text: factor.text,
    type: factor.type,
  };

  const [original, setOriginal] = useState(() => initialData);
  const [form, setForm] = useState(() => initialData);

  const dirty =
    form.text !== original.text ||
    form.type !== original.type;

  function handleCancel() {
    setForm(original);
    setIsEditing(false);
  }

async function handleSave() {
  setSaving(true);

  try {
    const fd = new FormData();

    fd.set('text', form.text);
    fd.set('type', form.type);

    await updateFactor(factor.id, fd);

    setOriginal({ ...form });

    setSaved(true);
    setIsEditing(false);

    setTimeout(() => setSaved(false), 3000);
  } finally {
    setSaving(false);
  }
}

  async function handleDelete() {
    const confirmed = confirm('Weet je zeker dat je deze factor wilt verwijderen?');
    if (!confirmed) return;

    setDeleting(true);

    try {
      await deleteFactor(factor.id);

      window.location.reload();
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-4">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => setIsExpanded((v) => !v)} className="text-left cursor-pointer">
          <p className="text-sm font-semibold text-stone-800">
            {isExpanded ? '▾' : '▸'} {form.text.length > 60 ? form.text.slice(0, 60) + '...' : form.text || 'Onbenoemd'}
          </p>
        </button>

        {isExpanded && (
          <Button
            variant={isEditing ? 'cancel' : 'small'}
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          >
            {isEditing ? 'Annuleren' : 'Bewerken'}
          </Button>
          
        )}
      </div>

      {/* CONTENT */}
      {isExpanded && (
        <div className="mt-4 space-y-4">

          {/* VIEW MODE */}
          {!isEditing && (
            <>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Tekst
              </span>
              <p className="text-sm text-stone-600 leading-relaxed">
                {form.text || 'Geen tekst beschikbaar.'}
              </p>
              <p className="text-xs text-stone-500 mt-1">
                Type:{' '}
                <span className={form.type === 'plus' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                  {form.type === 'plus' ? 'Plus' : 'Min'}
                </span>
              </p>
              {saved && <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                Opgeslagen!
                </p>}
            </>
          )}

          {/* EDIT MODE */}
          {isEditing && (
            <div className="bg-accent/10 border border-accent rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
                      Bewerken
                    </p>
                    <h2 className="text-base font-semibold text-stone-800 mb-1">
                      Factor "{ factor.text }" aanpassen
                    </h2>
                    <p className="text-sm text-stone-500">
                      Bewerk hier de tekst en het type van de factor.
                    </p>
                  </div>
                <Button variant="delete" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Verwijderen...' : 'Verwijderen'}
                </Button>
              </div>

              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Tekst
                </span>
                <textarea
                  rows={3}
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={form.text}
                  onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                />
              </div>

              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Type
                </span>
                <select
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={form.type}
                  onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as 'plus' | 'min' }))}
                >
                  <option value="plus">Plus</option>
                  <option value="min">Min</option>
                </select>
              </div>

              <div className="flex items-center gap-4 pt-1">
                <Button variant="small" onClick={handleSave} disabled={!dirty || saving}>
                  {saving ? 'Opslaan...' : 'Opslaan'}
                </Button>
                {dirty && !saving && (
                  <span className="text-sm text-stone-400">Onopgeslagen wijzigingen</span>
                )}
              </div>
            </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

