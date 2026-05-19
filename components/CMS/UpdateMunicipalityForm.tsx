'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Municipality } from '@/types/cms';

import { createFactor } from "@/lib/actions/factor-actions";
import { createMechanism } from "@/lib/actions/mechanism-actions";
import { createCoreElement } from "@/lib/actions/core-element-actions";
import UpdateMunicipalitySection from './UpdateMunicipalitySection';
import UpdateCoreElementSection from './UpdateCoreElementSection';
import CreateCoreElementSection, { CoreElementFormState } from "./CreateCoreElementSection";

import Button from "../Button";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function emptyCoreElement(): CoreElementFormState {
  return { id: uid(), slug: "", title: "", factors: [], mechanisms: [] };
}

export default function UpdateMunicipalityForm({ municipality }: { municipality: Municipality }) {
  const router = useRouter();
  const [coreElements, setCoreElements] = useState<CoreElementFormState[]>([]);  
  
  function updateCoreElement(id: string, updated: CoreElementFormState) {
      setCoreElements((prev) => prev.map((ce) => (ce.id === id ? updated : ce)));
    }

    function removeCoreElement(id: string) {
  setCoreElements((prev) => prev.filter((ce) => ce.id !== id));
}

async function handleSaveCoreElement(ce: CoreElementFormState) {
  const ceData = new FormData();
  ceData.set("title", ce.title);

  const coreElementId = await createCoreElement(municipality.id, ceData);

  for (const factor of ce.factors) {
    const factorData = new FormData();
    factorData.set("text", factor.text);
    factorData.set("type", factor.type);
    await createFactor(coreElementId, factorData);
  }

  for (const mechanism of ce.mechanisms) {
    const mechanismData = new FormData();
    mechanismData.set("text", mechanism.text);
    await createMechanism(coreElementId, mechanismData);
  }

  removeCoreElement(ce.id);
  router.refresh();
}

return (
  <div className="mt-6 space-y-8 max-w-7xl">
    <UpdateMunicipalitySection municipality={municipality} />

    <div className="bg-secondary/10 border border-stone-200 rounded-lg p-6 space-y-6">
      <h3 className="text-xs font-medium tracking-widest uppercase text-accent">
        Kernelementen
      </h3>
      {municipality.core_elements.map((ce) => (
        <UpdateCoreElementSection key={ce.id} coreElement={ce} />
      ))}
    </div>

    <Button
      type="button"
      variant="small"
      onClick={() => setCoreElements((prev) => [...prev, emptyCoreElement()])}
    >
      + Kernelement toevoegen
    </Button>

    {coreElements.map((ce, index) => (
      <div key={ce.id} className="space-y-3">
        <CreateCoreElementSection
          coreElement={ce}
          index={index}
          onChange={(updated) => updateCoreElement(ce.id, updated)}
          onRemove={() => removeCoreElement(ce.id)}
          disabled={false}
        />
        <div className="flex justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleSaveCoreElement(ce)}
          >
            Kernelement opslaan
          </Button>
        </div>
      </div>
    ))}
  </div>
);
}
