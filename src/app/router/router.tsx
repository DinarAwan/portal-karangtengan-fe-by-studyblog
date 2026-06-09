import { createBrowserRouter, Navigate } from 'react-router-dom';

import { LoginPage } from '../../features/auth/pages/LoginPage';
import { DashboardPage } from '../../features/portal/dashboard/pages/DashboardPage';
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
