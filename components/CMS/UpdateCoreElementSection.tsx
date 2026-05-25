'use client';

import { useRouter } from "next/navigation";
import { useState } from 'react';

import { updateCoreElement, deleteCoreElement } from '@/lib/actions/core-element-actions';
import { CoreElement } from '@/types/cms';
import { createMechanism } from '@/lib/actions/mechanism-actions';
import { createFactor } from '@/lib/actions/factor-actions';

import CreateFactorSection, { FactorFormState } from "./CreateFactorSection";
import CreateMechanismSection, { MechanismFormState } from "./CreateMechanismSection";
import UpdateMechanismSection from './UpdateMechanismSection';
import UpdateFactorSection from './UpdateFactorSection';
import Button from '@/components/Button';

export default function CoreElementSection({ coreElement }: { coreElement: CoreElement }) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(coreElement.title);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [newMechanisms, setNewMechanisms] = useState<MechanismFormState[]>([]);
  const [newFactors, setNewFactors] = useState<FactorFormState[]>([]);

  const [savedTitle, setSavedTitle] = useState(coreElement.title);
  const dirty = title !== savedTitle;

  function handleCancel() {
    setTitle(savedTitle);
    setIsEditing(false);
  }

  async function handleSave() {
    setSaving(true);

    try {
      const fd = new FormData();
      fd.set('title', title);

      await updateCoreElement(coreElement.id, fd);

      setSavedTitle(title);
      setSaved(true);
      setIsEditing(false);

      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveMechanisms() {
    setSaving(true);
    try {
      for (const mechanism of newMechanisms) {
        const fd = new FormData();
        fd.set('text', mechanism.text);
        await createMechanism(coreElement.id, fd);
      }
      setNewMechanisms([]);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveFactors() {
    setSaving(true);
    try {
      for (const factor of newFactors) {
        const fd = new FormData();
        fd.set('text', factor.text);
        fd.set('type', factor.type);
        await createFactor(coreElement.id, fd);
      }
      setNewFactors([]);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

    async function handleDelete() {
      const confirmed = confirm('Weet je zeker dat je dit kernelement wilt verwijderen?');
      if (!confirmed) return;
  
      setDeleting(true);
  
      try {
        await deleteCoreElement(coreElement.id);
  
        window.location.reload();
      } finally {
        setDeleting(false);
      }
    }

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => setIsExpanded((v) => !v)} className="text-left cursor-pointer">
          <p className="text-lg font-semibold text-primary">
            {isExpanded ? '▾' : '▸'} {title || 'Ongetiteld kernelement'}
          </p>
        </button>
        {isExpanded && (
          <Button 
          variant={isEditing ? 'cancel' : 'small'} 
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}>
            {isEditing ? 'Annuleren' : 'Bewerken'}
          </Button>
          
        )}
      </div>

      {/* CONTENT */}
      {isExpanded && (
        <div className="mt-4 space-y-5">
          {/* VIEW MODE */}
          {!isEditing && (
            <>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Titel
              </span>
              <p className="text-sm text-stone-600 leading-relaxed">
                {title || 'Geen tekst beschikbaar.'}
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
                    Kernelement "{ coreElement.title }" aanpassen
                  </h2>
                  <p className="text-sm text-stone-500 mb-5">
                    Bewerk hier de titel van het kernelement.
                  </p>
                </div>
                <Button variant="delete" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Verwijderen...' : 'Verwijder kernelement'}
                </Button> 
              </div>             

              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Titel
                </span>
                <input
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 pt-1">
                <Button variant="small" onClick={handleSave} disabled={!dirty || saving}>
                  {saving ? 'Opslaan...' : 'Opslaan'}
                </Button>
                {dirty && !saving && (
                  <span className="text-sm text-stone-400">
                    Onopgeslagen wijzigingen
                  </span>
                )}
              </div>
            </div>
            </div>
          )}

          {/* MECHANISMS + FACTORS */}
          <div className="bg-gray-100 border border-stone-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreElement.mechanisms.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium tracking-widest uppercase text-accent">
                  Mechanismen
                </h4>
                <div className="space-y-3">
                  {coreElement.mechanisms.map((m) => (
                    <UpdateMechanismSection key={m.id} mechanism={m} />
                  ))}
                </div>
              </div>
            )}
            {coreElement.factors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium tracking-widest uppercase text-accent">
                  Factoren
                </h4>
                <div className="space-y-3">
                  {coreElement.factors.map((f) => (
                    <UpdateFactorSection key={f.id} factor={f} />
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>

          {/* NEW MECHANISMS & FACTORS */}
          <CreateMechanismSection
            mechanisms={newMechanisms}
            onChange={setNewMechanisms}
            disabled={saving}
          />
          {newMechanisms.length > 0 && (
            <Button type="button" variant="small" onClick={handleSaveMechanisms} disabled={saving}>
              {saving ? 'Opslaan...' : 'Mechanismen opslaan'}
            </Button>
          )}

          <CreateFactorSection
            factors={newFactors}
            onChange={setNewFactors}
            disabled={saving}
          />
          {newFactors.length > 0 && (
            <Button type="button" variant="small" onClick={handleSaveFactors} disabled={saving}>
              {saving ? 'Opslaan...' : 'Factoren opslaan'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
