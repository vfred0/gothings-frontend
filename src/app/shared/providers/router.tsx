import { AppRoutes } from '@core/utils/app-routes.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '@app/pages/LoginPage.tsx';
import RegisterPage from '@app/pages/RegisterPage.tsx';

const router = createBrowserRouter([
  { path: AppRoutes.ROOT, element: <LoginPage /> },
  { path: AppRoutes.REGISTER, element: <RegisterPage /> },
]);

export default function AppRouterProvider() {
  return <RouterProvider router={router} />;
}
