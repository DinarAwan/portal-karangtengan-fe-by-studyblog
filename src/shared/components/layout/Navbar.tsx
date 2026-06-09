import { NavLink } from '@mantine/core';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  IconBuildingStore,
  IconChartBar,
  IconHome,
  IconLogin2,
  IconNews,
  IconPlant2,
  IconPhone,
  IconSparkles,
} from '@tabler/icons-react';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">
            Portal Desa
          </p>
          <h1 className="text-lg font-semibold text-neutral-950">
            Karangtengah
          </h1>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink
            active={location.pathname === '/'}
            className="rounded-md"
            label="Beranda"
            leftSection={<IconHome size="1.1rem" stroke={1.5} />}
            onClick={() => navigate('/')}
          />
          <NavLink
            active={location.pathname.startsWith('/berita')}
            className="rounded-md"
            label="Berita"
            leftSection={<IconNews size="1.1rem" stroke={1.5} />}
            onClick={() => navigate('/berita')}
          />
          <NavLink
            active={location.pathname.startsWith('/pertanian')}
            className="rounded-md"
            label="Pertanian"
            leftSection={<IconPlant2 size="1.1rem" stroke={1.5} />}
            onClick={() => navigate('/pertanian')}
          />
          <NavLink
            active={location.pathname.startsWith('/umkm')}
            className="rounded-md"
            label="UMKM"
            leftSection={<IconBuildingStore size="1.1rem" stroke={1.5} />}
            onClick={() => navigate('/umkm')}
          />
          <NavLink
            active={location.pathname.startsWith('/infografis')}
            className="rounded-md"
            label="Infografis"
            leftSection={<IconChartBar size="1.1rem" stroke={1.5} />}
            onClick={() => navigate('/infografis')}
          />
          <NavLink
            active={location.pathname.startsWith('/nawasena')}
            className="rounded-md"
            label="NAWASENA"
            leftSection={<IconSparkles size="1.1rem" stroke={1.5} />}
            onClick={() => navigate('/nawasena')}
          />
          <NavLink
            active={location.pathname.startsWith('/kontak')}
            className="rounded-md"
            label="Kontak"
            leftSection={<IconPhone size="1.1rem" stroke={1.5} />}
            onClick={() => navigate('/kontak')}
          />
        </nav>

        <Link
          className="inline-flex h-10 items-center gap-2 rounded-md bg-neutral-900 px-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          to="/login"
        >
          <IconLogin2 size={18} />
          Admin
        </Link>
      </div>

      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto border-t border-neutral-100 px-4 py-2 md:hidden">
        <NavLink
          active={location.pathname === '/'}
          className="min-w-max rounded-md"
          label="Beranda"
          leftSection={<IconHome size="1.1rem" stroke={1.5} />}
          onClick={() => navigate('/')}
        />
        <NavLink
          active={location.pathname.startsWith('/berita')}
          className="min-w-max rounded-md"
          label="Berita"
          leftSection={<IconNews size="1.1rem" stroke={1.5} />}
          onClick={() => navigate('/berita')}
        />
        <NavLink
          active={location.pathname.startsWith('/pertanian')}
          className="min-w-max rounded-md"
          label="Pertanian"
          leftSection={<IconPlant2 size="1.1rem" stroke={1.5} />}
          onClick={() => navigate('/pertanian')}
        />
        <NavLink
          active={location.pathname.startsWith('/umkm')}
          className="min-w-max rounded-md"
          label="UMKM"
          leftSection={<IconBuildingStore size="1.1rem" stroke={1.5} />}
          onClick={() => navigate('/umkm')}
        />
        <NavLink
          active={location.pathname.startsWith('/infografis')}
          className="min-w-max rounded-md"
          label="Infografis"
          leftSection={<IconChartBar size="1.1rem" stroke={1.5} />}
          onClick={() => navigate('/infografis')}
        />
        <NavLink
          active={location.pathname.startsWith('/nawasena')}
          className="min-w-max rounded-md"
          label="NAWASENA"
          leftSection={<IconSparkles size="1.1rem" stroke={1.5} />}
          onClick={() => navigate('/nawasena')}
        />
        <NavLink
          active={location.pathname.startsWith('/kontak')}
          className="min-w-max rounded-md"
          label="Kontak"
          leftSection={<IconPhone size="1.1rem" stroke={1.5} />}
          onClick={() => navigate('/kontak')}
        />
      </nav>
    </header>
  );
};
