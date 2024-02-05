import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages/auth/login/login.page'),
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/auth/register/register.page'),
  },
];

export default routes;
