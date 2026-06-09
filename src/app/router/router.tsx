import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LoginPage } from '../../features/auth/pages/LoginPage';
import { BeritaPage } from '../../features/portal/berita/pages/BeritaPage';
import { DashboardPage } from '../../features/portal/dashboard/pages/DashboardPage';
import { InfografisPage } from '../../features/portal/infografis/pages/InfografisPage';
import { KontakPage } from '../../features/portal/kontak/pages/KontakPage';
import { NawasenaPage } from '../../features/portal/nawasena/pages/NawasenaPage';
import { PertanianPage } from '../../features/portal/pertanian/pages/PertanianPage';
import { UmkmPage } from '../../features/portal/umkm/pages/UmkmPage';
import { DashboardLayout } from '../../shared/components/layout/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'berita',
        element: <BeritaPage />,
      },
      {
        path: 'pertanian',
        element: <PertanianPage />,
      },
      {
        path: 'umkm',
        element: <UmkmPage />,
      },
      {
        path: 'infografis',
        element: <InfografisPage />,
      },
      {
        path: 'nawasena',
        element: <NawasenaPage />,
      },
      {
        path: 'kontak',
        element: <KontakPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <Navigate to="/" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
