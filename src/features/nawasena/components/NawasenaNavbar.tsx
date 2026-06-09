import { useNavigate } from 'react-router-dom';
import { IconBell, IconLogout, IconUserCircle } from '@tabler/icons-react';

import { useAuth } from '../../../app/providers/AuthContext';

export const NawasenaNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">
            NAWASENA
          </p>
          <h1 className="text-lg font-semibold text-neutral-950">
            Dashboard Admin
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notifikasi"
            className="grid h-10 w-10 place-items-center rounded-md border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
            title="Notifikasi"
            type="button"
          >
            <IconBell size={19} />
          </button>
          <div className="hidden items-center gap-2 rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-700 sm:flex">
            <IconUserCircle size={18} className="text-emerald-700" />
            Admin
          </div>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-900 px-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            onClick={handleLogout}
            type="button"
          >
            <IconLogout size={18} />
            Keluar
          </button>
        </div>
      </div>
    </header>
  );
};
