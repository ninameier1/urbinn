"use client";

import CreateFactorSection, { FactorFormState } from "./CreateFactorSection";
import CreateMechanismSection, { MechanismFormState } from "./CreateMechanismSection";

import Button from "../Button";

export interface CoreElementFormState {
  id: string;
  title: string;
  slug: string;
  factors: FactorFormState[];
  mechanisms: MechanismFormState[];
}

// ---- CCOMPONUS ----

interface CoreElementProps {
  coreElement: CoreElementFormState;
  index: number;
  onChange: (updated: CoreElementFormState) => void;
  onRemove: () => void;
  disabled?: boolean;
}

export default function CreateCoreElementSection({ coreElement, index, onChange, onRemove, disabled, }: CoreElementProps) {
  function updateCoreElement(
    updates: Partial<CoreElementFormState>
  ) {
    onChange({
      ...coreElement,
      ...updates,
    });
  }

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-6">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
            Kernelement {index + 1}
          </p>

          <p className="text-sm text-stone-500">
            Vul de titel van het kernelement in.
          </p>
        </div>

        <Button
          variant="delete"
          onClick={onRemove}
          disabled={disabled}
          className="mt-1"
        >
          Verwijderen
        </Button>
      </div>

      <div className="mt-8 space-y-6">
        {/* TITLE */}
        <div className="space-y-1.5">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
            Titel <span className="text-destructive">*</span>
          </label>

          <input
            type="text"
            required
            maxLength={100}
            placeholder="bijv. Veiligheid"
            value={coreElement.title}
            onChange={(e) =>
              updateCoreElement({
                title: e.target.value,
              })
            }
            disabled={disabled}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
        </div>

        {/* MECHANISMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <CreateMechanismSection
          mechanisms={coreElement.mechanisms}
          onChange={(mechanisms) =>
            updateCoreElement({ mechanisms })
          }
          disabled={disabled}
        />

        {/* FACTORS */}
        <CreateFactorSection
          factors={coreElement.factors}
          onChange={(factors) =>
            updateCoreElement({ factors })
          }
          disabled={disabled}
        />
        </div>
      </div>
    </div>
  );
}