import { useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconArrowRight, IconLock, IconMail } from '@tabler/icons-react';

import { useAuth } from '../../../app/providers/AuthContext';

type LoginLocationState = {
  from?: {
    pathname?: string;
  };
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@karangtengah.id');
  const [password, setPassword] = useState('password');

  const from = (location.state as LoginLocationState | null)?.from?.pathname ?? '/';
  const redirectTo = from === '/login' ? '/' : from;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login('dev-access-token', 'dev-refresh-token');
    navigate(redirectTo, { replace: true });
  };

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-950">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center">
        <section className="grid w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm lg:grid-cols-[1fr_420px]">
          <div className="hidden bg-[linear-gradient(135deg,#166534_0%,#0f766e_45%,#0369a1_100%)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-100">
                Portal Desa
              </p>
              <h1 className="mt-4 max-w-lg text-4xl font-semibold leading-tight">
                Karangtengah
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-md bg-white/12 p-4">
                <p className="text-2xl font-semibold">128</p>
                <p className="mt-1 text-emerald-50">Data warga</p>
              </div>
              <div className="rounded-md bg-white/12 p-4">
                <p className="text-2xl font-semibold">24</p>
                <p className="mt-1 text-emerald-50">Agenda</p>
              </div>
              <div className="rounded-md bg-white/12 p-4">
                <p className="text-2xl font-semibold">8</p>
                <p className="mt-1 text-emerald-50">Layanan</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
                Dashboard
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-neutral-950">
                Masuk Portal
              </h2>
            </div>

            <label className="mt-8 block text-sm font-medium text-neutral-700">
              Email
              <span className="mt-2 flex h-11 items-center gap-3 rounded-md border border-neutral-300 bg-white px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                <IconMail size={18} className="text-neutral-500" />
                <input
                  className="h-full flex-1 border-0 bg-transparent text-sm outline-none"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                />
              </span>
            </label>

            <label className="mt-4 block text-sm font-medium text-neutral-700">
              Password
              <span className="mt-2 flex h-11 items-center gap-3 rounded-md border border-neutral-300 bg-white px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                <IconLock size={18} className="text-neutral-500" />
                <input
                  className="h-full flex-1 border-0 bg-transparent text-sm outline-none"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                />
              </span>
            </label>

            <button
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              type="submit"
            >
              Masuk
              <IconArrowRight size={18} />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};
