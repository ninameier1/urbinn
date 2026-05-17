'use client';

import { useState } from 'react';
import { Mechanism } from '@/types/cms';
import Button from '@/components/Button';

type MechanismProps = {
  mechanism: Mechanism;
  ceId: number;
  onMechanismField: (
    ceId: number,
    mechId: number,
    field: 'label' | 'text',
    value: string
  ) => void;
};

export default function MechanismSection({
  mechanism: m,
  ceId,
  onMechanismField,
}: MechanismProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-4">
      
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className="text-left cursor-pointer"
        >
          <p className="text-sm font-semibold text-stone-800">
            {isExpanded ? '▾' : '▸'} {m.label || 'Onbenoemd mechanisme'}
          </p>
        </button>

        {isExpanded && (
          <Button
            variant={isEditing ? 'cancel' : 'small'}
            onClick={() => setIsEditing((v) => !v)}
          >
            {isEditing ? 'Annuleren' : 'Bewerken'}
          </Button>
        )}
      </div>

      {/* CONTENT */}
      {isExpanded && (
        <div className="mt-4 space-y-4">
          
          {/* EDIT MODE */}
          {isEditing && (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-widest uppercase text-accent">
                Bewerken
              </p>

              {/* LABEL */}
              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Label
                </span>

                <input
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={m.label}
                  onChange={(e) =>
                    onMechanismField(ceId, m.id, 'label', e.target.value)
                  }
                />
              </div>

              {/* TEXT */}
              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Tekst
                </span>

                <textarea
                  rows={3}
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={m.text}
                  onChange={(e) =>
                    onMechanismField(ceId, m.id, 'text', e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* VIEW MODE */}
          {!isEditing && (
            <>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Tekst
                </span>
            <p className="text-sm text-stone-600 leading-relaxed">
              {m.text || 'Geen tekst beschikbaar.'}
            </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}