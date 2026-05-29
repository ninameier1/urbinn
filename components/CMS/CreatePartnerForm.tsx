"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { createPartner } from "@/lib/actions/partner-actions";
import { uploadImage } from "@/lib/actions/upload-actions";

import Button from "../Button";
import ImageUpload from "../ImageUpload";

export interface PartnerFormState {
  name: string;

  logo: string | null;

  website: string;
  description: string;
  partnerInfo: string;
  researchRole: string;

  image1: string | null;
  image2: string | null;
  image3: string | null;
}

export default function CreatePartnerForm() {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [uploading, setUploading] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [partner, setPartner] = useState<PartnerFormState>({
    name: "",

    logo: null,

    website: "",
    description: "",
    partnerInfo: "",
    researchRole: "",

    image1: null,
    image2: null,
    image3: null,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setPartner((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleImageUpload(
  field: "logo" | "image1" | "image2" | "image3",
  file: File
) {
  setUploading(true);
  setUploadError(null);

  try {
    const formData = new FormData();
    formData.append("file", file);

    const imageUrl = await uploadImage(formData);

    setPartner((prev) => ({
      ...prev,
      [field]: imageUrl,
    }));
  } catch (err) {
    setUploadError(
      err instanceof Error
        ? err.message
        : "Upload mislukt."
    );
  } finally {
    setUploading(false);
  }
}

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError(null);

    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.set("name", partner.name);
        formData.set("website", partner.website);
        formData.set("description", partner.description);
        formData.set("partnerInfo", partner.partnerInfo);
        formData.set("researchRole", partner.researchRole);

        formData.set("logo", partner.logo || "");

        formData.set("image1", partner.image1 || "");
        formData.set("image2", partner.image2 || "");
        formData.set("image3", partner.image3 || "");

        const partnerId = await createPartner(formData);

        router.push(`/cms/partners/${partnerId}`);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Er is iets misgegaan."
        );
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg border border-stone-200 bg-white p-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
            Partner
          </p>

          <h2 className="mb-1 text-base font-semibold text-stone-800">
            Partner informatie
          </h2>

          <p className="text-sm text-stone-500">
            Basisinformatie over de partnerorganisatie.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* NAME */}
          <div className="space-y-1.5">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
              Naam <span className="text-destructive">*</span>
            </label>

            <input
              name="name"
              type="text"
              required
              value={partner.name}
              onChange={handleChange}
              disabled={isPending}
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
            />
          </div>

          {/* WEBSITE */}
          <div className="space-y-1.5">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
              Website <span className="text-destructive">*</span>
            </label>

            <input
              name="website"
              type="url"
              required
              placeholder="https://..."
              value={partner.website}
              onChange={handleChange}
              disabled={isPending}
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
            />
          </div>

          {/* LOGO */}
          <ImageUpload
            value={partner.logo}
            uploading={uploading}
            error={uploadError}
            onChange={(file) => handleImageUpload("logo", file)}
            onRemove={() =>
              setPartner((prev) => ({
                ...prev,
                logo: null,
              }))
            }
          />

          {/* DESCRIPTION */}
          <div className="space-y-1.5">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
              Beschrijving
            </label>

            <textarea
              name="description"
              rows={4}
              value={partner.description}
              onChange={handleChange}
              disabled={isPending}
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
            />
          </div>

          {/* PARTNER INFO */}
          <div className="space-y-1.5">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
              Over de partner
            </label>

            <textarea
              name="partnerInfo"
              rows={5}
              value={partner.partnerInfo}
              onChange={handleChange}
              disabled={isPending}
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
            />
          </div>

          {/* RESEARCH ROLE */}
          <div className="space-y-1.5">
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
              Rol binnen onderzoek
            </label>

            <textarea
              name="researchRole"
              rows={5}
              value={partner.researchRole}
              onChange={handleChange}
              disabled={isPending}
              className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
            />
          </div>

          {/* EXTRA IMAGES */}
          <details className="group overflow-hidden rounded-lg border border-accent bg-accent/10">
            <summary className="flex cursor-pointer items-center justify-between px-6 py-4 list-none">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-accent">
                  Extra afbeeldingen
                </p>

                <p className="text-sm text-stone-500">
                  Optionele sfeerbeelden of contentafbeeldingen.
                </p>
              </div>

              <span className="text-sm font-medium text-accent transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>

            <div className="space-y-6 px-6 pb-6">
              {(["image1", "image2", "image3"] as const).map(
                (field, index) => (
                  <ImageUpload
                    key={field}
                    value={partner[field]}
                    uploading={uploading}
                    error={uploadError}
                    onChange={(file) =>
                      handleImageUpload(field, file)
                    }
                    onRemove={() =>
                      setPartner((prev) => ({
                        ...prev,
                        [field]: null,
                      }))
                    }
                  />
                )
              )}
            </div>
          </details>
        </div>
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Opslaan..." : "Partner aanmaken"}
        </Button>

        <Button
          type="button"
          variant="cancel"
          disabled={isPending}
          onClick={() => router.back()}
        >
          Annuleren
        </Button>
      </div>
    </form>
  );
}