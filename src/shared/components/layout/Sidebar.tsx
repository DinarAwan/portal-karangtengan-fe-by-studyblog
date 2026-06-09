//ini sidebar
import { NavLink } from 'react-router-dom';
import { IconLayoutDashboard } from '@tabler/icons-react';

const navigation = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: IconLayoutDashboard,
  },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition',
    isActive
      ? 'bg-emerald-700 text-white shadow-sm'
      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950',
  ].join(' ');

const NavItems = () => {
  return (
    <>
      {navigation.map((item) => (
        <NavLink key={item.href} to={item.href} className={navLinkClass}>
          <item.icon size={19} />
          {item.label}
        </NavLink>
      ))}
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
              Portal Desa
            </p>
            <h2 className="mt-2 text-xl font-semibold text-neutral-950">
              Karangtengah
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
