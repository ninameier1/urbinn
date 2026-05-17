'use client';

import { useState } from 'react';
import { CoreElement } from '@/types/cms';
import MechanismSection from './MechanismSection';
import FactorSection from './FactorSection';
import Button from '@/components/Button';

type CoreElementProps = {
  coreElement: CoreElement;
  onCoreElementTitle: (ceId: number, value: string) => void;
  onMechanismField: (
    ceId: number,
    mechId: number,
    field: 'label' | 'text',
    value: string
  ) => void;
  onFactorField: (
    ceId: number,
    factorId: number,
    field: 'label' | 'text' | 'type',
    value: string
  ) => void;
};

export default function CoreElementSection({
  coreElement: ce,
  onCoreElementTitle,
  onMechanismField,
  onFactorField,
}: CoreElementProps) {
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
            {isExpanded ? '▾' : '▸'} {ce.title || 'Ongetiteld kernelement'}
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
        <div className="mt-4 space-y-5">
          
          {/* EDIT MODE */}
          {isEditing && (
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-widest uppercase text-accent">
                Bewerken
              </p>

              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Titel
                </span>

                <input
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={ce.title}
                  onChange={(e) =>
                    onCoreElementTitle(ce.id, e.target.value)
                  }
                />
              </div>
            </div>
          )}

          {/* MECHANISMS + FACTORS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MECHANISMS */}
            {ce.mechanisms.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium tracking-widest uppercase text-stone-500">
                  Mechanismen
                </h4>

                <div className="space-y-3">
                  {ce.mechanisms.map((m) => (
                    <MechanismSection
                      key={m.id}
                      mechanism={m}
                      ceId={ce.id}
                      onMechanismField={onMechanismField}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* FACTORS */}
            {ce.factors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium tracking-widest uppercase text-stone-500">
                  Factoren
                </h4>

                <div className="space-y-3">
                  {ce.factors.map((f) => (
                    <FactorSection
                      key={f.id}
                      factor={f}
                      ceId={ce.id}
                      onFactorField={onFactorField}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}