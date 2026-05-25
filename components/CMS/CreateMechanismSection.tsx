"use client";

import Button from "../Button";

export interface MechanismFormState {
  id: string;
  text: string;
}

const uid = () => Math.random().toString(36).slice(2, 9);

const createMechanism = (): MechanismFormState => ({
  id: uid(),
  text: "",
});

// -------- MECHANISM ROW --------

interface MechanismRowProps {
  mechanism: MechanismFormState;
  index: number;
  onChange: (text: string) => void;
  onRemove: () => void;
  disabled?: boolean;
}

function MechanismRow({ mechanism, index, onChange, onRemove, disabled, }: MechanismRowProps) {
  return (
    <div className="rounded-md border border-stone-200 bg-stone-50 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-stone-800 mb-1">
          Mechanisme {index + 1}
        </span>

        <Button
          variant="delete"
          onClick={onRemove}
          disabled={disabled}
        >
          Verwijderen
        </Button>
      </div>

      <textarea
        rows={2}
        placeholder="Toelichting"
        value={mechanism.text}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
      />
    </div>
  );
}

// ----------- MAIN COMPONENT ---------

interface MechanismProps {
  mechanisms: MechanismFormState[];
  onChange: (updated: MechanismFormState[]) => void;
  disabled?: boolean;
}

export default function CreateMechanismSection({ mechanisms, onChange, disabled, }: MechanismProps) {
  function updateMechanism(id: string, text: string) {
    onChange(
      mechanisms.map((mechanism) =>
        mechanism.id === id
          ? { ...mechanism, text }
          : mechanism
      )
    );
  }

  function removeMechanism(id: string) {
    onChange(
      mechanisms.filter((mechanism) => mechanism.id !== id)
    );
  }

  function addMechanism() {
    onChange([...mechanisms, createMechanism()]);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          Mechanismen
        </span>

        <Button
          type="button"
          variant="small"
          onClick={addMechanism}
          disabled={disabled}
        >
          + Mechanisme toevoegen
        </Button>
      </div>

      <p className="text-sm text-stone-500">
        Voeg mechanismen toe die je kan gebruiken om het
        kernelement te beïnvloeden.
      </p>

      {mechanisms.length === 0 && (
        <p className="mt-6 text-sm italic text-stone-400">
          Nog geen mechanismen toegevoegd.
        </p>
      )}

      {mechanisms.map((mechanism, index) => (
        <MechanismRow
          key={mechanism.id}
          index={index}
          mechanism={mechanism}
          onChange={(text) =>
            updateMechanism(mechanism.id, text)
          }
          onRemove={() => removeMechanism(mechanism.id)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}