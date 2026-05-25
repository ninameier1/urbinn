"use client";

import ImageUpload from "../ImageUpload";

export interface MunicipalityFormState {
  name: string;
  description: string;
  image: string | null;
}

interface MunicipalityProps {
  value: MunicipalityFormState;
  onChange: (value: MunicipalityFormState) => void;
  uploading: boolean;
  uploadError: string | null;
  onImageUpload: (file: File) => Promise<void>;
  disabled?: boolean;
}

export default function CreateMunicipalitySection({ value, onChange, uploading, uploadError, onImageUpload, disabled, }: MunicipalityProps) {
  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6">
      <div>
        <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
          Gemeente
        </p>
        <h2 className="text-base font-semibold text-stone-800 mb-1">
          Gemeente informatie
        </h2>
        <p className="text-sm text-stone-500">Basisinformatie en beschrijving</p>
      </div>

      <div className="mt-8 max-w-7xl space-y-6">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-xs font-medium tracking-wide uppercase text-accent block mb-1"
          >
            Naam gemeente <span className="text-destructive">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="bijv. Almere"
            value={value.name}
            onChange={(e) => onChange({ ...value, name: e.target.value })}
            disabled={disabled}
            className="w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground">Maximaal 100 tekens.</p>
        </div>

        {/* Description */}
        <div>
          <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
            Beschrijving
          </span>
          <textarea
            value={value.description}
            placeholder="Vul in..."
            onChange={(e) => onChange({ ...value, description: e.target.value })}
            rows={4}
            disabled={disabled}
            className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-200 rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        {/* Image */}
        <ImageUpload
          value={value.image}
          uploading={uploading}
          error={uploadError}
          onChange={onImageUpload}
          onRemove={() => onChange({ ...value, image: null })}
        />
      </div>
    </div>
  );
}