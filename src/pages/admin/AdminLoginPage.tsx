import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Info, Lock } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { Field } from '@/components/ui/Field';
import { buttonStyles } from '@/components/ui/Button';
import { useDemoStore } from '@/store/DemoStoreContext';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAdminSignedIn, signInAdmin } = useDemoStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (isAdminSignedIn) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError('Enter your admin email and password.');
      return;
    }
    signInAdmin();
    navigate('/admin', { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-950 px-5 py-16">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative w-full max-w-md space-y-8 animate-fade-up">
        <div className="flex flex-col items-center gap-5 text-center">
          <Logo />
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-navy-900 text-electric-300">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">Admin sign in</h1>
            <p className="mt-2 text-sm text-steel-400">Restricted area for VehicleScan24 staff.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="surface-card space-y-6 p-6 sm:p-8">
          <Field label="Email" htmlFor="admin-email">
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-base"
            />
          </Field>
          <Field label="Password" htmlFor="admin-password" error={error}>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(null);
              }}
              className="input-base"
            />
          </Field>
          <button type="submit" className={buttonStyles({ size: 'lg', fullWidth: true })}>
            Sign in
          </button>
        </form>

        <p className="flex gap-3 rounded-xl border border-electric-400/30 bg-electric-500/10 p-4 text-xs leading-relaxed text-electric-100">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0" />
          Preview sign-in only. Real admin authentication is not connected yet, so any email and password opens this
          demo area. No credentials are stored in this app.
        </p>
      </div>
    </div>
  );
}
