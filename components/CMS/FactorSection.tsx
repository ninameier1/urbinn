'use client';

import { useState } from 'react';
import { Factor } from '@/types/cms';
import Button from '@/components/Button';

type FactorProps = {
  factor: Factor;
  ceId: number;
  onFactorField: (
    ceId: number,
    factorId: number,
    field: 'label' | 'text' | 'type',
    value: string
  ) => void;
};

export default function FactorSection({
  factor: f,
  ceId,
  onFactorField,
}: FactorProps) {
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
            {isExpanded ? '▾' : '▸'} {f.label || 'Onbenoemde factor'}
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
                  value={f.label}
                  onChange={(e) =>
                    onFactorField(ceId, f.id, 'label', e.target.value)
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
                  value={f.text}
                  onChange={(e) =>
                    onFactorField(ceId, f.id, 'text', e.target.value)
                  }
                />
              </div>

              {/* TYPE */}
              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Type
                </span>

                <select
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={f.type}
                  onChange={(e) =>
                    onFactorField(ceId, f.id, 'type', e.target.value)
                  }
                >
                  <option value="plus">Plus</option>
                  <option value="min">Min</option>
                </select>
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
                    {f.text || 'Geen tekst beschikbaar.'}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                Type:{' '}
                    <span
                    className={
                        f.type === 'plus'
                        ? 'text-green-600 font-medium'
                        : 'text-red-600 font-medium'
                    }
                    >
                    {f.type === 'plus' ? 'Plus' : 'Min'}
                    </span>
                </p>

            </>
          )}
        </div>
      )}
    </div>
  );
}