'use client';

import { Municipality } from '@/types/cms';

import MunicipalitySection from './MunicipalitySection';
import CoreElementSection from './CoreElementSection';

export default function UpdateMunicipalityForm({ municipality }: { municipality: Municipality }) {
  return (
    <div className="mt-6 space-y-8 max-w-7xl">
      <MunicipalitySection municipality={municipality} />
      <div className="bg-secondary/10 border border-stone-200 rounded-lg p-6 space-y-6">
        <h3 className="text-xs font-medium tracking-widest uppercase text-accent">
          Kernelementen
        </h3>
        {municipality.core_elements.map((ce) => (
          <CoreElementSection key={ce.id} coreElement={ce} />
        ))}
      </div>
    </div>
  );
}


// 'use client';

// import { useEffect, useState } from 'react';
// import { updateMunicipality } from '@/lib/actions/municipality-actions';
// import { updateCoreElement } from '@/lib/actions/core-element-actions';
// import { updateMechanism } from '@/lib/actions/mechanism-actions';
// import { updateFactor } from '@/lib/actions/factor-actions';
// import { Municipality } from '@/types/cms';

// import Button from '../Button';
// import MunicipalitySection from './MunicipalitySection';

// export default function MunicipalityForm({ municipality }: { municipality: Municipality }) {
//   const [form, setForm] = useState(municipality);
//   const [dirty, setDirty] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [saved, setSaved] = useState(false);

//   useEffect(() => {
//     setDirty(JSON.stringify(form) !== JSON.stringify(municipality));
//   }, [form, municipality]);

//   function setMunicipalityField(field: 'name' | 'description' | 'image', value: string) {
//     setForm((prev) => ({ ...prev, [field]: value }));
//   }

//   function setCoreElementTitle(ceId: number, value: string) {
//     setForm((prev) => ({
//       ...prev,
//       core_elements: prev.core_elements.map((ce) =>
//         ce.id === ceId ? { ...ce, title: value } : ce
//       ),
//     }));
//   }

//   function setMechanismField(ceId: number, mechId: number, field: 'label' | 'text', value: string) {
//     setForm((prev) => ({
//       ...prev,
//       core_elements: prev.core_elements.map((ce) =>
//         ce.id === ceId
//           ? { ...ce, mechanisms: ce.mechanisms.map((m) => m.id === mechId ? { ...m, [field]: value } : m) }
//           : ce
//       ),
//     }));
//   }

//   function setFactorField(ceId: number, factorId: number, field: 'label' | 'text' | 'type', value: string) {
//     setForm((prev) => ({
//       ...prev,
//       core_elements: prev.core_elements.map((ce) =>
//         ce.id === ceId
//           ? { ...ce, factors: ce.factors.map((f) => f.id === factorId ? { ...f, [field]: value } : f) }
//           : ce
//       ),
//     }));
//   }

//   async function handleSave() {
//     setSaving(true);
//     try {
//       const mfd = new FormData();
//       mfd.set('name', form.name);
//       if (form.description) mfd.set('description', form.description);
//       if (form.image) mfd.set('image', form.image);
//       await updateMunicipality(form.id, mfd);

//       for (const ce of form.core_elements) {
//         const cefd = new FormData();
//         cefd.set('title', ce.title);
//         await updateCoreElement(ce.id, cefd);

//         for (const m of ce.mechanisms) {
//           const mfd = new FormData();
//           mfd.set('label', m.label);
//           mfd.set('text', m.text);
//           await updateMechanism(m.id, mfd);
//         }

//         for (const f of ce.factors) {
//           const ffd = new FormData();
//           ffd.set('label', f.label);
//           ffd.set('text', f.text);
//           ffd.set('type', f.type);
//           await updateFactor(f.id, ffd);
//         }
//       }

//       setSaved(true);
//       setDirty(false);
//       setTimeout(() => setSaved(false), 3000);
//     } finally {
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="mt-6 space-y-8 max-w-7xl">
//       <MunicipalitySection
//         form={form}
//         onMunicipalityField={setMunicipalityField}
//         onCoreElementTitle={setCoreElementTitle}
//         onMechanismField={setMechanismField}
//         onFactorField={setFactorField}
//       />

//       <div className="flex items-center gap-4 pt-2">
//         <Button
//           variant="secondary"
//           onClick={handleSave}
//           disabled={!dirty || saving}
//         >
//           {saving ? 'Opslaan...' : 'Opslaan'}
//         </Button>
//         {saved && <span className="text-sm text-green-600">Opgeslagen!</span>}
//         {dirty && !saving && <span className="text-sm text-muted-foreground">Er zijn onopgeslagen wijzigingen.</span>}
//       </div>
//     </div>
//   );
// }