"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updatePartner, deletePartner } from "@/lib/actions/partner-actions";
import { Partner } from "@/types/cms";

import Button from "@/components/Button";
import ImageUpload from "@/components/ImageUpload";

export default function UpdatePartnerForm({
  partner,
}: {
  partner: Partner;
}) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  function handleCancel() {
    setForm(original);
    setIsEditing(false);
  }

  async function handleSave() {
    setSaving(true);

    try {
      const fd = new FormData();

      fd.set("name", form.name);
      fd.set("website", form.website);
      fd.set("description", form.description);
      fd.set("partnerInfo", form.partnerInfo);
      fd.set("researchRole", form.researchRole);

      fd.set("logo", form.logo);
      fd.set("image1", form.image1);
      fd.set("image2", form.image2);
      fd.set("image3", form.image3);

      await updatePartner(partner.id, fd);

      setOriginal({ ...form });
      setSaved(true);
      setIsEditing(false);

      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
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
    <div className="space-y-6 rounded-lg border border-stone-200 bg-white p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
            Partner
          </p>
          <p className="text-sm text-stone-500">
            Basisinformatie over deze partner.
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
        <section className="space-y-6">
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
                <img
                  src={form.logo}
                  alt="logo"
                  className="h-10 w-auto object-contain"
                />
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
              Partner info
            </p>
            <p className="text-sm text-stone-700 whitespace-pre-wrap">
              {form.partnerInfo || "—"}
            </p>
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">
              Onderzoeksrol
            </p>
            <p className="text-sm text-stone-700 whitespace-pre-wrap">
              {form.researchRole || "—"}
            </p>
          </div>

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
          <div className="flex items-start justify-between">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-accent">
                Bewerken
              </p>

              <h2 className="mb-1 text-base font-semibold text-stone-800">
                Partner aanpassen
              </h2>

              <p className="mb-5 text-sm text-stone-500">
                Pas de gegevens van deze partner aan.
              </p>
            </div>

            <Button
              variant="delete"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Verwijderen..." : "Verwijder"}
            </Button>
          </div>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
          />

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
          />

          <ImageUpload
            value={form.logo}
            uploading={false}
            onChange={() => {}}
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
          />

          <textarea
            name="partnerInfo"
            value={form.partnerInfo}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
          />

          <textarea
            name="researchRole"
            value={form.researchRole}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-stone-300 bg-stone-50 px-3 py-2 text-sm"
          />

          <div className="flex items-center gap-4 pt-2">
            <Button
              variant="small"
              onClick={handleSave}
              disabled={!dirty || saving}
            >
              {saving ? "Opslaan..." : "Opslaan"}
            </Button>

            {dirty && !saving && (
              <span className="text-sm text-stone-400">
                Onopgeslagen wijzigingen
              </span>
            )}
          </div>
        </section>
      )}
    </div>
  );
}