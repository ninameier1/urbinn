'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Button from './Button';

type ImageProps = { 
  value?: string | null; onChange: (file: File) => void; onRemove?: () => void;
  uploading?: boolean;
  error?: string | null;
  disabled?: boolean;
};

export default function ImageUpload({ value, onChange, onRemove, uploading = false,error, disabled = false, }: ImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onChange(file);

    // reset input so same file can be selected again
    e.target.value = '';
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
        Afbeelding
      </label>

      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Preview"
            width={448}
            height={448}
            className="block h-auto w-auto"
          />

          {onRemove && (
            <Button 
              variant="delete" 
              onClick={onRemove}
              disabled={disabled || uploading}
              className="absolute top-2 right-2"
            >
              X
            </Button>
          )}
        </div>
      ) : (

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className="cursor-pointer flex w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-stone-300 bg-stone-50 px-4 py-8 text-sm text-stone-500 hover:border-stone-400 hover:text-stone-700 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-stone-400 border-t-transparent" />
              <span>Uploaden...</span>
            </>
          ) : (
            <>
              <span className="font-medium">
                Klik om een afbeelding te kiezen
              </span>
              <span className="text-xs text-stone-400">
                JPG of PNG
              </span>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="sr-only"
      />

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}