'use client';

import Image from 'next/image';

import { useState } from 'react';
import { updateMunicipality } from '@/lib/actions/municipality-actions';
import { Municipality } from '@/types/cms';

import Button from '@/components/Button';


export default function MunicipalitySection({ municipality }: { municipality: Municipality }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: municipality.name,
    description: municipality.description ?? '',
    image: municipality.image ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const dirty =
    form.name !== municipality.name ||
    form.description !== (municipality.description ?? '') ||
    form.image !== (municipality.image ?? '');

  async function handleSave() {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.set('name', form.name);
      if (form.description) fd.set('description', form.description);
      if (form.image) fd.set('image', form.image);
      await updateMunicipality(municipality.id, fd);
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setForm({
      name: municipality.name,
      description: municipality.description ?? '',
      image: municipality.image ?? '',
    });
    setIsEditing(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const fd = new FormData();
      fd.set('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error();
      const { url } = await res.json();
      setForm((p) => ({ ...p, image: url }));
    } catch {
      setUploadError('Uploaden mislukt. Probeer opnieuw.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="space-y-6">
      {/* MUNICIPALITY CARD */}
      <div className="bg-white border border-stone-200 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
              Gemeente
            </p>
            <h2 className="text-base font-semibold text-stone-800 mb-1">
              {form.name || 'Onbekende gemeente'}
            </h2>
            <p className="text-sm text-stone-500">
              Basisinformatie en beschrijving
            </p>
          </div>

          <Button
            variant={isEditing ? 'cancel' : 'small'}
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          >
            {isEditing ? 'Annuleren' : 'Bewerken'}
          </Button>
        </div>

        {/* VIEW MODE */}
        {!isEditing && (
          <div>
            <p className="text-sm text-stone-600 mb-4">
              {form.description || 'Geen beschrijving'}
            </p>
            {form.image && (
              <Image
                src={form.image}
                alt={form.name}
                width={260}
                height={160}
                className="rounded-md border object-cover"
              />
            )}
            {saved && <p className="mt-3 text-sm text-green-600">Opgeslagen!</p>}
          </div>
        )}

        {/* EDIT MODE */}
        {isEditing && (
        <section className="bg-accent/10 border border-accent rounded-lg p-6">
          <div className="space-y-4">
            <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
              Bewerken
            </p>
            <h2 className="text-base font-semibold text-stone-800 mb-1">Gemeente aanpassen</h2>
            <p className="text-sm text-stone-500 mb-5">
              Pas de basisinformatie van deze gemeente aan.
            </p>

            <div>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Naam
              </span>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
              />
            </div>

            <div>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Beschrijving
              </span>
              <textarea
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                rows={4}
                className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
              />
            </div>

            <div>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Afbeelding
              </span>

              {form.image && (
                <div className="mb-3">
                  <Image
                    src={form.image}
                    alt="preview"
                    width={260}
                    height={160}
                    className="rounded-md border object-cover"
                  />
                </div>
              )}

              <div className="flex items-center gap-3">
                <label
                  htmlFor="image-upload"
                  className={`
                    inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium
                    transition cursor-pointer
                    ${uploading
                      ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-700'
                    }
                  `}
                >
                  {uploading ? 'Uploaden...' : 'Afbeelding kiezen'}
                </label>

                <span className="text-sm text-stone-400">
                  JPG of PNG
                </span>
              </div>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />

              {uploadError && (
                <p className="mt-2 text-sm text-red-600">
                  {uploadError}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Button variant="secondary" onClick={handleSave} disabled={!dirty || saving}>
                {saving ? 'Opslaan...' : 'Opslaan'}
              </Button>
              {dirty && !saving && (
                <span className="text-sm text-stone-400">Onopgeslagen wijzigingen</span>
              )}
            </div>
          </div>
          </section>
        )}
      </div>
    </section>
  );
}


// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { Municipality } from '@/types/cms';
// import CoreElementSection from './CoreElementSection';
// import Button from '@/components/Button';

// type MunicipalityProps = {
//   form: Municipality;
//   onMunicipalityField: (field: 'name' | 'description' | 'image', value: string) => void;
//   onCoreElementTitle: (ceId: number, value: string) => void;
//   onMechanismField: (ceId: number, mechId: number, field: 'label' | 'text', value: string) => void;
//   onFactorField: (ceId: number, factorId: number, field: 'label' | 'text' | 'type', value: string) => void;
// };

// export default function MunicipalitySection({
//   form,
//   onMunicipalityField,
//   onCoreElementTitle,
//   onMechanismField,
//   onFactorField,
// }: MunicipalityProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [uploadError, setUploadError] = useState<string | null>(null);

//   async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     setUploadError(null);

//     try {
//       const formData = new FormData();
//       formData.set('file', file);

//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) throw new Error();

//       const { url } = await res.json();
//       onMunicipalityField('image', url);
//     } catch {
//       setUploadError('Uploaden mislukt. Probeer opnieuw.');
//     } finally {
//       setUploading(false);
//     }
//   }

//   return (
//     <section className="space-y-6">
//       {/* MUNICIPALITY CARD */}
//       <div className="bg-white border border-stone-200 rounded-lg p-6">
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <p className="text-xs font-medium tracking-widest uppercase text-accent mb-2">
//               Gemeente
//             </p>

//             <h2 className="text-base font-semibold text-stone-800 mb-1">
//               {form.name || 'Onbekende gemeente'}
//             </h2>

//             <p className="text-sm text-stone-500">
//               Basisinformatie en beschrijving
//             </p>
//           </div>

//           <Button
//             variant={isEditing ? 'cancel' : 'small'}
//             onClick={() => setIsEditing((v) => !v)}
//           >
//             {isEditing ? 'Annuleren' : 'Bewerken'}
//           </Button>
//         </div>

//         {/* VIEW MODE */}
//         {!isEditing && (
//           <div>
//             <p className="text-sm text-stone-600 mb-4">
//               {form.description ?? 'Geen beschrijving'}
//             </p>

//             {form.image && (
//               <Image
//                 src={form.image}
//                 alt={form.name}
//                 width={260}
//                 height={160}
//                 className="rounded-md border object-cover"
//               />
//             )}
//           </div>
//         )}

//         {/* EDIT MODE */}
//         {isEditing && (
//           <section className="bg-white border border-stone-200 rounded-lg p-6">
//             <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
//               Bewerken
//             </p>

//             <h2 className="text-base font-semibold text-stone-800 mb-1">
//               Gemeente aanpassen
//             </h2>

//             <p className="text-sm text-stone-500 mb-5">
//               Pas de basisinformatie van deze gemeente aan.
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
//                   Naam
//                 </span>
//                 <input
//                   value={form.name}
//                   onChange={(e) =>
//                     onMunicipalityField('name', e.target.value)
//                   }
//                   className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
//                 />
//               </div>

//               <div>
//                 <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
//                   Beschrijving
//                 </span>
//                 <textarea
//                   value={form.description ?? ''}
//                   onChange={(e) =>
//                     onMunicipalityField('description', e.target.value)
//                   }
//                   rows={4}
//                   className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
//                 />
//               </div>

//               <div>
//                 <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
//                   Afbeelding
//                 </span>

//                 {form.image && (
//                   <div className="mb-3">
//                     <Image
//                       src={form.image}
//                       alt="preview"
//                       width={260}
//                       height={160}
//                       className="rounded-md border object-cover"
//                     />
//                   </div>
//                 )}

//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={uploading}
//                   className="text-sm"
//                 />

//                 {uploading && (
//                   <p className="mt-2 text-sm text-stone-500">
//                     Uploaden...
//                   </p>
//                 )}

//                 {uploadError && (
//                   <p className="mt-2 text-sm text-red-600">
//                     {uploadError}
//                   </p>
//                 )}
//               </div>

//               <Button variant="small">
//                 Opslaan
//               </Button>
//             </div>
//           </section>
//         )}
//       </div>

//       {/* CORE ELEMENTS */}
//       <div className="space-y-3">
//         <h3 className="text-xs font-medium tracking-widest uppercase text-stone-500">
//           Kernelementen
//         </h3>

//         {form.core_elements.map((ce) => (
//           <CoreElementSection
//             key={ce.id}
//             coreElement={ce}
//             onCoreElementTitle={onCoreElementTitle}
//             onMechanismField={onMechanismField}
//             onFactorField={onFactorField}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }