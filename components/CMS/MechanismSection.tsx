'use client';

import { useState } from 'react';
import { updateMechanism } from '@/lib/actions/mechanism-actions';
import { Mechanism } from '@/types/cms';

import Button from '@/components/Button';

export default function MechanismSection({ mechanism }: { mechanism: Mechanism }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ label: mechanism.label, text: mechanism.text });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const dirty = form.label !== mechanism.label || form.text !== mechanism.text;

  function handleCancel() {
    setForm({ label: mechanism.label, text: mechanism.text });
    setIsEditing(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const fd = new FormData();
      fd.set('label', form.label);
      fd.set('text', form.text);
      await updateMechanism(mechanism.id, fd);
      setSaved(true);
      setIsEditing(false);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-4">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => setIsExpanded((v) => !v)} className="text-left cursor-pointer">
          <p className="text-sm font-semibold text-stone-800">
            {isExpanded ? '▾' : '▸'} {form.text.length > 60 ? form.text.slice(0, 60) + '...' : form.text || 'Onbenoemd'}
          </p>
        </button>
        {isExpanded && (
          <Button
            variant={isEditing ? 'cancel' : 'small'}
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          >
            {isEditing ? 'Annuleren' : 'Bewerken'}
          </Button>
        )}
      </div>

      {/* CONTENT */}
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* VIEW MODE */}
          {!isEditing && (
            <>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Tekst
              </span>
              <p className="text-sm text-stone-600 leading-relaxed">
                {form.text || 'Geen tekst beschikbaar.'}
              </p>
              {saved && <p className="text-sm text-green-600">Opgeslagen!</p>}
            </>
          )}

          {/* EDIT MODE */}
          {isEditing && (
            <div className="bg-accent/10 border border-accent rounded-lg p-6">
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-widest uppercase text-accent">
                Bewerken
              </p>
              <p className="text-sm text-stone-500">
                Bewerk hier de tekst van het mechanisme.
              </p>
              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Tekst
                </span>
                <textarea
                  rows={3}
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={form.text}
                  onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                />
              </div>
              <div className="flex items-center gap-4 pt-1">
                <Button variant="small" onClick={handleSave} disabled={!dirty || saving}>
                  {saving ? 'Opslaan...' : 'Opslaan'}
                </Button>
                {dirty && !saving && (
                  <span className="text-sm text-stone-400">Onopgeslagen wijzigingen</span>
                )}
              </div>
            </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// 'use client';

// import { useState } from 'react';
// import { Mechanism } from '@/types/cms';
// import Button from '@/components/Button';

// type MechanismProps = {
//   mechanism: Mechanism;
//   ceId: number;
//   onMechanismField: (
//     ceId: number,
//     mechId: number,
//     field: 'label' | 'text',
//     value: string
//   ) => void;
// };

// export default function MechanismSection({
//   mechanism: m,
//   ceId,
//   onMechanismField,
// }: MechanismProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <div className="bg-white border border-stone-200 rounded-lg p-4">
      
//       {/* HEADER */}
//       <div className="flex items-start justify-between gap-3">
//         <button
//           onClick={() => setIsExpanded((v) => !v)}
//           className="text-left cursor-pointer"
//         >
//           <p className="text-sm font-semibold text-stone-800">
//             {isExpanded ? '▾' : '▸'} {m.label || 'Onbenoemd mechanisme'}
//           </p>
//         </button>

//         {isExpanded && (
//           <Button
//             variant={isEditing ? 'cancel' : 'small'}
//             onClick={() => setIsEditing((v) => !v)}
//           >
//             {isEditing ? 'Annuleren' : 'Bewerken'}
//           </Button>
//         )}
//       </div>

//       {/* CONTENT */}
//       {isExpanded && (
//         <div className="mt-4 space-y-4">
          
//           {/* EDIT MODE */}
//           {isEditing && (
//             <div className="space-y-3">
//               <p className="text-xs font-medium tracking-widest uppercase text-accent">
//                 Bewerken
//               </p>

//               {/* LABEL */}
//               <div>
//                 <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
//                   Label
//                 </span>

//                 <input
//                   className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
//                   value={m.label}
//                   onChange={(e) =>
//                     onMechanismField(ceId, m.id, 'label', e.target.value)
//                   }
//                 />
//               </div>

//               {/* TEXT */}
//               <div>
//                 <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
//                   Tekst
//                 </span>

//                 <textarea
//                   rows={3}
//                   className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
//                   value={m.text}
//                   onChange={(e) =>
//                     onMechanismField(ceId, m.id, 'text', e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           )}

//           {/* VIEW MODE */}
//           {!isEditing && (
//             <>
//                 <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
//                   Tekst
//                 </span>
//             <p className="text-sm text-stone-600 leading-relaxed">
//               {m.text || 'Geen tekst beschikbaar.'}
//             </p>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }