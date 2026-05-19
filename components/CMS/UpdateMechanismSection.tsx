'use client';

import { useState } from 'react';
import { updateMechanism, deleteMechanism } from '@/lib/actions/mechanism-actions';
import { Mechanism } from '@/types/cms';

import Button from '@/components/Button';

export default function UpdateMechanismSection({ mechanism }: { mechanism: Mechanism }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({text: mechanism.text });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dirty =  form.text !== mechanism.text;

  function handleCancel() {
    setForm({ text: mechanism.text });
    setIsEditing(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.set('text', form.text);
      await updateMechanism(mechanism.id, fd);
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
      const confirmed = confirm('Weet je zeker dat je dit mechanisme wilt verwijderen?');
      if (!confirmed) return;
  
      setDeleting(true);
  
      try {
        await deleteMechanism(mechanism.id);
  
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
              {saved && <p className="text-sm text-green-600">Opgeslagen!</p>}
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
                    Mechanisme "{ mechanism.text }" aanpassen
                  </h2>
                  <p className="text-sm text-stone-500">
                    Bewerk hier de tekst van het mechanisme.
                  </p>
                </div>
                <Button variant="delete" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Verwijderen...' : 'Verwijder'}
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

