import { Link } from 'react-router-dom';
import {
  IconCalendarEvent,
  IconHome,
  IconLogin2,
  IconPhone,
  IconTools,
} from '@tabler/icons-react';

const guestMenus = [
  {
    label: 'Beranda',
    href: '#beranda',
    icon: IconHome,
  },
  {
    label: 'Layanan',
    href: '#layanan',
    icon: IconTools,
  },
  {
    label: 'Agenda',
    href: '#agenda',
    icon: IconCalendarEvent,
  },
  {
    label: 'Kontak',
    href: '#kontak',
    icon: IconPhone,
  },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#beranda" className="shrink-0">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-emerald-700">
            Portal Desa
          </p>
          <h1 className="text-lg font-semibold text-neutral-950">
            Karangtengah
          </h1>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {guestMenus.map((menu) => (
            <a
              key={menu.href}
              className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950"
              href={menu.href}
            >
              <menu.icon size={17} />
              {menu.label}
            </a>
          ))}
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
        {guestMenus.map((menu) => (
          <a
            key={menu.href}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
            href={menu.href}
          >
            <menu.icon size={17} />
            {menu.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
