"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createMunicipality } from "@/lib/actions/municipality-actions";
import { uploadImage } from "@/lib/actions/upload-actions";

import Button from "../Button";
import CreateMunicipalitySection, { MunicipalityFormState } from "./CreateMunicipalitySection";
import CreateCoreElementSection, { CoreElementFormState } from "./CreateCoreElementSection";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function emptyCoreElement(): CoreElementFormState {
  return { id: uid(), slug: "", title: "", factors: [], mechanisms: [] };
}

export default function CreateMunicipalityForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [municipality, setMunicipality] = useState<MunicipalityFormState>({
    name: "",
    description: "",
    image: null,
  });

  const [coreElements, setCoreElements] = useState<CoreElementFormState[]>([]);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleImageUpload(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.set("image", file);
      const url = await uploadImage(formData);
      setMunicipality((prev) => ({ ...prev, image: url }));
    } catch {
      setUploadError("Afbeelding uploaden mislukt.");
    } finally {
      setUploading(false);
    }
  }

  function updateCoreElement(id: string, updated: CoreElementFormState) {
    setCoreElements((prev) => prev.map((ce) => (ce.id === id ? updated : ce)));
  }

  function removeCoreElement(id: string) {
    setCoreElements((prev) => prev.filter((ce) => ce.id !== id));
  }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const municipalityData = new FormData();
        municipalityData.set("name", municipality.name);
        municipalityData.set("description", municipality.description);
        if (municipality.image) municipalityData.set("image", municipality.image);

        const municipalityId = await createMunicipality(municipalityData, coreElements);

        router.push(`/cms/municipalities/${municipalityId}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Er is iets misgegaan.");
      }
    });
  }

  const isBusy = isPending || uploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* MUNICIPALITY & CORE ELEMENT */}
      <CreateMunicipalitySection
        value={municipality}
        onChange={setMunicipality}
        uploading={uploading}
        uploadError={uploadError}
        onImageUpload={handleImageUpload}
        disabled={isBusy}
      />

      {coreElements.map((ce, index) => (
        <CreateCoreElementSection
          key={ce.id}
          coreElement={ce}
          index={index}
          onChange={(updated) => updateCoreElement(ce.id, updated)}
          onRemove={() => removeCoreElement(ce.id)}
          disabled={isBusy}
        />
      ))}

      {/* ADD CORE ELEMENT */}
      <Button
        type="button"
        variant="secondary"
        disabled={isBusy}
        onClick={() => setCoreElements((prev) => [...prev, emptyCoreElement()])}
      >
        + Kernelement toevoegen
      </Button>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* SAVE & CANCEL ACTIONSSS */}
      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={isBusy}>
          {isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Opslaan…
            </>
          ) : (
            "Gemeente aanmaken"
          )}
        </Button>

        <Button
          type="button"
          variant="cancel"
          disabled={isBusy}
          onClick={() => router.back()}
        >
          Annuleren
        </Button>
      </div>
    </form>
  );
}
