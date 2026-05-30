"use client";

import Button from "../Button";

export type FactorType = "plus" | "min";

export interface FactorFormState {
  id: string;
  text: string;
  type: FactorType;
}

const uid = () => Math.random().toString(36).slice(2, 9);

const createFactor = (): FactorFormState => ({
  id: uid(),
  text: "",
  type: "plus",
});


// ------- FACTOR ROW --------

interface FactorRowProps {
  factor: FactorFormState;
  index: number;
  onTextChange: (text: string) => void;
  onTypeChange: (type: FactorType) => void;
  onRemove: () => void;
  disabled?: boolean;
}

function FactorRow({ factor, index, onTextChange, onTypeChange, onRemove, disabled, }: FactorRowProps) {
  
  return (
    <div className="rounded-md border border-stone-200 bg-stone-50 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
            <span className="text-base font-semibold text-stone-800 mb-2">
            Factor {index + 1}
            </span>
            <Button
            variant="delete"
            onClick={onRemove}
            disabled={disabled}
            >
            Verwijderen
            </Button>
        </div>
      
      <div className="flex items-center justify-between gap-2">
        <div className="flex overflow-hidden rounded-md border border-stone-300 text-xs font-medium">
          <button
            type="button"
            onClick={() => onTypeChange("plus")}
            disabled={disabled}
            className={`px-3 py-1.5 transition-colors ${
              factor.type === "plus"
                ? "bg-green-600 text-white"
                : "bg-white text-stone-600 hover:bg-stone-100"
            }`}
          >
            + Plus
          </button>

          <button
            type="button"
            onClick={() => onTypeChange("min")}
            disabled={disabled}
            className={`px-3 py-1.5 transition-colors ${
              factor.type === "min"
                ? "bg-red-500 text-white"
                : "bg-white text-stone-600 hover:bg-stone-100"
            }`}
          >
            − Min
          </button>
        </div>
        </div>

      <textarea
        rows={2}
        placeholder="Toelichting"
        value={factor.text}
        onChange={(e) => onTextChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
      />
    </div>
  );
}

// --------- COMPONENTUS ------

interface FactorProps {
  factors: FactorFormState[];
  onChange: (updated: FactorFormState[]) => void;
  disabled?: boolean;
}

export default function CreateFactorSection({ factors, onChange, disabled, }: FactorProps) {
  function updateFactor(
    id: string,
    updates: Partial<FactorFormState>
  ) {
    onChange(
      factors.map((factor) =>
        factor.id === id
          ? { ...factor, ...updates }
          : factor
      )
    );
  }

  function removeFactor(id: string) {
    onChange(
      factors.filter((factor) => factor.id !== id)
    );
  }

  function addFactor() {
    onChange([...factors, createFactor()]);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          Factoren
        </span>

        <Button
          type="button"
          variant="small"
          onClick={addFactor}
          disabled={disabled}
        >
          + Factor toevoegen
        </Button>
      </div>

      <p className="text-sm text-stone-500">
        Voeg factoren toe die het kernelement beïnvloeden.
      </p>

      {/* {factors.length === 0 && (
        <p className="mt-6 text-sm italic text-stone-400">
          Nog geen factoren toegevoegd.
        </p>
      )} */}

      {factors.map((factor, index) => (
        <FactorRow
          key={factor.id}
          index={index}
          factor={factor}
          onTextChange={(text) =>
            updateFactor(factor.id, { text })
          }
          onTypeChange={(type) =>
            updateFactor(factor.id, { type })
          }
          onRemove={() => removeFactor(factor.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}