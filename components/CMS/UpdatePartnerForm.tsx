"use client";
import Image
 from "next/image";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updatePartner, deletePartner } from "@/lib/actions/partner-actions";
import { uploadImage } from "@/lib/actions/upload-actions";
import { Partner } from "@/types/cms";


import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";

export default function UpdatePartnerForm({
  partner,
}: {
  partner: Partner;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

const initialData = {
    name: partner.name,
    website: partner.website,
    description: partner.description,
    partnerInfo: partner.partnerInfo,
    researchRole: partner.researchRole,

    logo: partner.logo ?? "",
    image1: partner.image1 ?? "",
    image2: partner.image2 ?? "",
    image3: partner.image3 ?? "",
  };

  const [original, setOriginal] = useState(() => initialData);
  const [form, setForm] = useState(() => initialData);

  const dirty =
    form.name !== original.name ||
    form.website !== original.website ||
    form.description !== original.description ||
    form.partnerInfo !== original.partnerInfo ||
    form.researchRole !== original.researchRole ||
    form.logo !== original.logo ||
    form.image1 !== original.image1 ||
    form.image2 !== original.image2 ||
    form.image3 !== original.image3;

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
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

      setForm((prev) => ({
        ...prev,
        [field]: imageUrl,
      }));
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Upload mislukt."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleCancel() {
    setForm(original);
    setIsEditing(false);
    setError(null);
    setUploadError(null);
  }

  async function handleSave() {
    setError(null);

    startTransition(async () => {
      try {
        const fd = new FormData();

        fd.set("name", form.name);
        fd.set("website", form.website);
        fd.set("description", form.description);
        fd.set("partnerInfo", form.partnerInfo);
        fd.set("researchRole", form.researchRole);

        fd.set("logo", form.logo || "");
        fd.set("image1", form.image1 || "");
        fd.set("image2", form.image2 || "");
        fd.set("image3", form.image3 || "");

        await updatePartner(partner.id, fd);

        setOriginal({ ...form });
        setSaved(true);
        setIsEditing(false);

        setTimeout(() => setSaved(false), 3000);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Er is iets misgegaan."
        );
      }
    });
  }

  async function handleDelete() {
    const confirmed = confirm(
      "Weet je zeker dat je deze partner wilt verwijderen?"
    );
    if (!confirmed) return;

    setDeleting(true);

    try {
      await deletePartner(partner.id);
      router.push("/cms/partners");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-stone-200 bg-white p-6">
        {/* HEADER */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
              Partner
            </p>
            <p className="text-sm text-stone-500">
              Basisinformatie over de partnerorganisatie.
            </p>
          </div>

          <Button
            variant={isEditing ? "cancel" : "small"}
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          >
            {isEditing ? "Annuleren" : "Bewerken"}
          </Button>
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <section className="mt-8 space-y-6">
            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                Naam
              </p>
              <p className="text-sm text-stone-700">{form.name || "—"}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                  Website
                </p>
                {form.website ? (
                  <a
                    href={form.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent underline break-all"
                  >
                    {form.website}
                  </a>
                ) : (
                  <p className="text-sm text-stone-400">—</p>
                )}
              </div>

              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                  Logo
                </p>
                {form.logo ? (
                <div className="overflow-hidden">
                  <Image
                    src={form.logo}
                    alt="logo"
                    width={80}
                    height={80}
                    className="h-auto max-h-20 w-auto max-w-full"
                  />
                  </div>
                ) : (
                  <p className="text-sm text-stone-400">—</p>
                  
                )}

              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                Beschrijving
              </p>
              <p className="text-sm text-stone-700 whitespace-pre-wrap">
                {form.description || "—"}
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                Over de partner
              </p>
              <p className="text-sm text-stone-700 whitespace-pre-wrap">
                {form.partnerInfo || "—"}
              </p>
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
                Rol binnen onderzoek
              </p>
              <p className="text-sm text-stone-700 whitespace-pre-wrap">
                {form.researchRole || "—"}
              </p>
            </div>

            {(form.image1 || form.image2 || form.image3) && (
              <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">
                  Extra afbeeldingen
                </p>
                <div className="flex flex-wrap gap-3">
                  {[form.image1, form.image2, form.image3].map(

                    (img, i) =>
                      img && (
                        <div key={i} className="relative h-[250px] w-[350px]">
                        <Image
                            src={img}
                            alt={`Afbeelding ${i + 1}`}
                            fill
                            sizes="350px"
                            className="object-cover"
                        />
                        </div>
                      )
                  )}
                </div>
              </div>
            )}

            {saved && (
              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                Partner opgeslagen!
              </div>
            )}
          </section>
        )}

        {/* EDIT MODE */}
        {isEditing && (
          <section className="space-y-4 rounded-lg border border-accent bg-accent/10 p-6">
            <div className="flex items-center justify-between">
                <div>
              <p className="text-xs font-medium uppercase tracking-widest text-accent mb-2">
                Bewerken
              </p>

            <p className="text-sm text-stone-500 mb-5">
              Je bewerkt momenteel: <span className="font-medium text-green-700">{partner.name}</span>
            </p>
            </div>

              <Button
                variant="delete"
                onClick={handleDelete}
                disabled={deleting || isPending}
              >
                {deleting ? "Verwijderen..." : "Verwijder"}
              </Button>
            </div>

            {/* NAME */}
            <div className="space-y-1.5">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
                Naam Gemeente <span className="text-destructive">*</span>
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
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
                value={form.website}
                onChange={handleChange}
                disabled={isPending}
                className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
              />
            </div>

            {/* LOGO */}
            <div className="space-y-1.5">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
                Logo
              </label>
              <ImageUpload
                value={form.logo}
                uploading={uploading}
                error={uploadError}
                onChange={(file) => handleImageUpload("logo", file)}
                onRemove={() =>
                  setForm((prev) => ({ ...prev, logo: '' }))
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-1.5">
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-accent">
                Beschrijving
              </label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
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
                value={form.partnerInfo}
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
                value={form.researchRole}
                onChange={handleChange}
                disabled={isPending}
                className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
              />
            </div>

            {/* EXTRA IMAGES */}
            <details className="group overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
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
                {(["image1", "image2", "image3"] as const).map((field) => (
                  <ImageUpload
                    key={field}
                    value={form[field]}
                    uploading={uploading}
                    error={uploadError}
                    onChange={(file) => handleImageUpload(field, file)}
                    onRemove={() =>
                      setForm((prev) => ({ ...prev, [field]: null }))
                    }
                  />
                ))}
              </div>
            </details>

            {error && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="primary"
                onClick={handleSave}
                disabled={!dirty || isPending || uploading}
              >
                {isPending ? "Opslaan..." : "Opslaan"}
              </Button>

              {dirty && !isPending && (
                <span className="text-sm text-stone-400">
                  Onopgeslagen wijzigingen
                </span>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}