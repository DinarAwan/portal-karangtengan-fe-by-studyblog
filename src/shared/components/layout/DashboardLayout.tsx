import { Outlet } from 'react-router-dom';

import { Navbar } from './Navbar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-950">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
