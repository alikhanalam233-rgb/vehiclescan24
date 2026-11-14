import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanSearch, ArrowRight } from 'lucide-react';
import { Field } from '@/components/ui/Field';
import { buttonStyles } from '@/components/ui/Button';
import { normalizeVin, validateVin } from '@/lib/vin';

export function VinSearchForm() {
  const navigate = useNavigate();
  const [vin, setVin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const normalized = normalizeVin(vin);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateVin(vin);
    if (problem) {
      setError(problem);
      return;
    }
    navigate(`/checkout?vin=${normalized}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="surface-card space-y-5 p-5 sm:p-6">
      <Field
        label="Vehicle Identification Number (VIN)"
        htmlFor="vin"
        error={error}
        hint="17 characters, found on the windscreen or in your registration document."
      >
        <div className="relative">
          <ScanSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-steel-500" />
          <input
            id="vin"
            name="vin"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            inputMode="text"
            placeholder="e.g. WVWZZZ1KZAW123456"
            maxLength={17}
            value={vin}
            onChange={(event) => {
              setVin(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
              if (error) setError(null);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby="vin-count"
            className="input-base pl-12 pr-16 font-mono text-base tracking-[0.12em]"
          />
          <span
            id="vin-count"
            className={`absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs ${
              normalized.length === 17 ? 'text-emerald-300' : 'text-steel-500'
            }`}
          >
            {normalized.length}/17
          </span>
        </div>
      </Field>
      <button type="submit" className={buttonStyles({ size: 'lg', fullWidth: true })}>
        Get my vehicle report
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
