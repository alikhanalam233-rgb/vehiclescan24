import { useState, type FormEvent } from 'react';
import { Field } from '@/components/ui/Field';
import { buttonStyles } from '@/components/ui/Button';
import { useDemoStore } from '@/store/DemoStoreContext';
import type { Order, VehicleDetails } from '@/types';

interface VehicleDraft {
  make: string;
  model: string;
  buildYear: string;
  firstRegistration: string;
  fuelType: string;
  colour: string;
  mileageKm: string;
}

function toDraft(vehicle: VehicleDetails): VehicleDraft {
  return {
    make: vehicle.make,
    model: vehicle.model,
    buildYear: vehicle.buildYear ? String(vehicle.buildYear) : '',
    firstRegistration: vehicle.firstRegistration,
    fuelType: vehicle.fuelType,
    colour: vehicle.colour,
    mileageKm: vehicle.mileageKm === null ? '' : String(vehicle.mileageKm),
  };
}

const CURRENT_YEAR = new Date().getFullYear();

export function VehicleForm({ order }: { order: Order }) {
  const { updateOrder } = useDemoStore();
  const [draft, setDraft] = useState<VehicleDraft>(() => toDraft(order.vehicle));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function update(field: keyof VehicleDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
    setError(null);
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const year = draft.buildYear ? Number(draft.buildYear) : null;
    const mileage = draft.mileageKm ? Number(draft.mileageKm) : null;
    if (year !== null && (!Number.isInteger(year) || year < 1900 || year > CURRENT_YEAR + 1)) {
      setError(`Build year must be between 1900 and ${CURRENT_YEAR + 1}.`);
      return;
    }
    if (mileage !== null && (!Number.isInteger(mileage) || mileage < 0)) {
      setError('Mileage must be a whole number of kilometres.');
      return;
    }
    updateOrder(order.reference, {
      vehicle: {
        make: draft.make.trim(),
        model: draft.model.trim(),
        buildYear: year,
        firstRegistration: draft.firstRegistration,
        fuelType: draft.fuelType.trim(),
        colour: draft.colour.trim(),
        mileageKm: mileage,
      },
    });
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="surface-card space-y-6 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Make" htmlFor="v-make">
          <input id="v-make" className="input-base" value={draft.make} onChange={(e) => update('make', e.target.value)} />
        </Field>
        <Field label="Model" htmlFor="v-model">
          <input id="v-model" className="input-base" value={draft.model} onChange={(e) => update('model', e.target.value)} />
        </Field>
        <Field label="Build year" htmlFor="v-year">
          <input id="v-year" inputMode="numeric" className="input-base" value={draft.buildYear} onChange={(e) => update('buildYear', e.target.value)} />
        </Field>
        <Field label="First registration" htmlFor="v-reg">
          <input id="v-reg" type="date" className="input-base" value={draft.firstRegistration} onChange={(e) => update('firstRegistration', e.target.value)} />
        </Field>
        <Field label="Fuel type" htmlFor="v-fuel">
          <input id="v-fuel" className="input-base" value={draft.fuelType} onChange={(e) => update('fuelType', e.target.value)} />
        </Field>
        <Field label="Colour" htmlFor="v-colour">
          <input id="v-colour" className="input-base" value={draft.colour} onChange={(e) => update('colour', e.target.value)} />
        </Field>
        <Field label="Recorded mileage (km)" htmlFor="v-km" error={error}>
          <input id="v-km" inputMode="numeric" className="input-base" value={draft.mileageKm} onChange={(e) => update('mileageKm', e.target.value)} />
        </Field>
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className={buttonStyles()}>
          Save vehicle details
        </button>
        {saved && <span className="text-sm text-emerald-300">Vehicle details saved.</span>}
      </div>
    </form>
  );
}
