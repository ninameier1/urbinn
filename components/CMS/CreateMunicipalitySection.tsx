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

          <details className="bg-accent/10 border border-accent rounded-lg overflow-hidden group">
            <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium tracking-widest uppercase text-accent mb-1">
                  Optionele informatie
                </p>


                <p className="text-sm text-stone-500">
                  Beschrijving en afbeelding.
                </p>
              </div>

              <span className="text-sm text-accent font-medium group-open:rotate-180 transition-transform">
                ▾
              </span>
            </summary>

<div className="px-6 pb-6 space-y-6">
        {/* Description */}
        <div className="space-y-1.5">
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
        <div className="space-y-1.5">
            <label className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Afbeelding 
            </label>
        <ImageUpload
          value={value.image}
          uploading={uploading}
          error={uploadError}
          onChange={onImageUpload}
          onRemove={() => onChange({ ...value, image: null })}
        />
        </div>
        </div>
        </details>
      </div>
    </div>
  );
}