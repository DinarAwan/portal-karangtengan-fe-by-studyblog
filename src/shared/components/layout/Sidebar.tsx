import { NavLink } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  IconCalendarEvent,
  IconLayoutDashboard,
  IconNews,
} from '@tabler/icons-react';

const NavItems = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <NavLink
        active={location.pathname === '/dashboard'}
        className="rounded-md"
        label="Dashboard"
        leftSection={<IconLayoutDashboard size="1.1rem" stroke={1.5} />}
        onClick={() => navigate('/dashboard')}
      />
      <NavLink
        active={location.pathname.startsWith('/dashboard/schedule')}
        className="rounded-md"
        label="Schedule"
        leftSection={<IconCalendarEvent size="1.1rem" stroke={1.5} />}
        onClick={() => navigate('/dashboard/schedule')}
      />
      <NavLink
        active={location.pathname.startsWith('/dashboard/berita')}
        className="rounded-md"
        label="Berita"
        leftSection={<IconNews size="1.1rem" stroke={1.5} />}
        onClick={() => navigate('/dashboard/berita')}
      />
      <NavLink
        active={location.pathname.startsWith('/dashboard/umkm')}
        className="rounded-md"
        label="UMKM"
        leftSection={<IconNews size="1.1rem" stroke={1.5} />}
        onClick={() => navigate('/dashboard/umkm')}
      />
      <NavLink
        active={location.pathname.startsWith('/dashboard/harvest')}
        className="rounded-md"
        label="Data Panen"
        leftSection={<IconNews size="1.1rem" stroke={1.5} />}
        onClick={() => navigate('/dashboard/harvest')}
      />
      <NavLink
        active={location.pathname.startsWith('/dashboard/village')}
        className="rounded-md"
        label="Prifile Desa"
        leftSection={<IconNews size="1.1rem" stroke={1.5} />}
        onClick={() => navigate('/dashboard/village')}
      />
    </>
  );
};

export const Sidebar = () => {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-neutral-200 bg-white px-4 py-5 lg:block">
        <div className="flex h-full flex-col">
          <div className="px-2">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-700">
              NAWASENA
            </p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Admin Panel
            </h2>
          </div>

          <nav className="mt-8 flex flex-col gap-2">
            <NavItems />
          </nav>
        </div>
      </aside>

      <nav className="flex gap-2 overflow-x-auto border-b border-neutral-200 bg-white px-4 py-3 lg:hidden">
        <NavItems />
      </nav>
    </>
  );
};
