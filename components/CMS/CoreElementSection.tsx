'use client';

import { useState } from 'react';
import { updateCoreElement } from '@/lib/actions/core-element-actions';
import { CoreElement } from '@/types/cms';

import MechanismSection from './MechanismSection';
import FactorSection from './FactorSection';
import Button from '@/components/Button';

export default function CoreElementSection({ coreElement }: { coreElement: CoreElement }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(coreElement.title);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [savedTitle, setSavedTitle] = useState(coreElement.title);
  const dirty = title !== savedTitle;

  function handleCancel() {
    setTitle(savedTitle);
    setIsEditing(false);
  }

  async function handleSave() {
    setSaving(true);

    try {
      const fd = new FormData();
      fd.set('title', title);

      await updateCoreElement(coreElement.id, fd);

      setSavedTitle(title);
      setSaved(true);
      setIsEditing(false);

      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white border border-accent rounded-lg p-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-3">
        <button onClick={() => setIsExpanded((v) => !v)} className="text-left cursor-pointer">
          <p className="text-lg font-semibold text-primary">
            {isExpanded ? '▾' : '▸'} {title || 'Ongetiteld kernelement'}
          </p>
        </button>
        {isExpanded && (
          <Button 
          variant={isEditing ? 'cancel' : 'small'} 
          onClick={isEditing ? handleCancel : () => setIsEditing(true)}>
            {isEditing ? 'Annuleren' : 'Bewerken'}
          </Button>
          
        )}
      </div>

      {/* CONTENT */}
      {isExpanded && (
        <div className="mt-4 space-y-5">
          {/* VIEW MODE */}
          {!isEditing && (
            <>
              <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                Titel
              </span>
              <p className="text-sm text-stone-600 leading-relaxed">
                {title || 'Geen tekst beschikbaar.'}
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
                Bewerk hier de titel van het kernelement.
              </p>
              <div>
                <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
                  Titel
                </span>
                <input
                  className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 pt-1">
                <Button variant="secondary" onClick={handleSave} disabled={!dirty || saving}>
                  {saving ? 'Opslaan...' : 'Opslaan'}
                </Button>
                {dirty && !saving && (
                  <span className="text-sm text-stone-400">
                    Onopgeslagen wijzigingen
                  </span>
                )}
              </div>
            </div>
            </div>
          )}

          {/* MECHANISMS + FACTORS */}
          <div className="bg-gray-100 border border-stone-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreElement.mechanisms.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium tracking-widest uppercase text-accent">
                  Mechanismen
                </h4>
                <div className="space-y-3">
                  {coreElement.mechanisms.map((m) => (
                    <MechanismSection key={m.id} mechanism={m} />
                  ))}
                </div>
              </div>
            )}
            {coreElement.factors.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium tracking-widest uppercase text-accent">
                  Factoren
                </h4>
                <div className="space-y-3">
                  {coreElement.factors.map((f) => (
                    <FactorSection key={f.id} factor={f} />
                  ))}
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      )}
    </div>
  );
}



// 'use client';

// import { useState } from 'react';
// import { CoreElement } from '@/types/cms';
// import MechanismSection from './MechanismSection';
// import FactorSection from './FactorSection';
// import Button from '@/components/Button';

// type CoreElementProps = {
//   coreElement: CoreElement;
//   onCoreElementTitle: (ceId: number, value: string) => void;
//   onMechanismField: (
//     ceId: number,
//     mechId: number,
//     field: 'label' | 'text',
//     value: string
//   ) => void;
//   onFactorField: (
//     ceId: number,
//     factorId: number,
//     field: 'label' | 'text' | 'type',
//     value: string
//   ) => void;
// };

// export default function CoreElementSection({
//   coreElement: ce,
//   onCoreElementTitle,
//   onMechanismField,
//   onFactorField,
// }: CoreElementProps) {
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
//             {isExpanded ? '▾' : '▸'} {ce.title || 'Ongetiteld kernelement'}
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
//         <div className="mt-4 space-y-5">
          
//           {/* EDIT MODE */}
//           {isEditing && (
//             <div className="space-y-3">
//               <p className="text-xs font-medium tracking-widest uppercase text-accent">
//                 Bewerken
//               </p>

//               <div>
//                 <span className="text-xs font-medium tracking-wide uppercase text-accent block mb-1">
//                   Titel
//                 </span>

//                 <input
//                   className="border p-2 w-full text-sm px-3 py-2 bg-stone-50 border-stone-300 rounded-md text-stone-900"
//                   value={ce.title}
//                   onChange={(e) =>
//                     onCoreElementTitle(ce.id, e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           )}

//           {/* MECHANISMS + FACTORS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
//             {/* MECHANISMS */}
//             {ce.mechanisms.length > 0 && (
//               <div className="space-y-3">
//                 <h4 className="text-xs font-medium tracking-widest uppercase text-stone-500">
//                   Mechanismen
//                 </h4>

//                 <div className="space-y-3">
//                   {ce.mechanisms.map((m) => (
//                     <MechanismSection
//                       key={m.id}
//                       mechanism={m}
//                       ceId={ce.id}
//                       onMechanismField={onMechanismField}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* FACTORS */}
//             {ce.factors.length > 0 && (
//               <div className="space-y-3">
//                 <h4 className="text-xs font-medium tracking-widest uppercase text-stone-500">
//                   Factoren
//                 </h4>

//                 <div className="space-y-3">
//                   {ce.factors.map((f) => (
//                     <FactorSection
//                       key={f.id}
//                       factor={f}
//                       ceId={ce.id}
//                       onFactorField={onFactorField}
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }