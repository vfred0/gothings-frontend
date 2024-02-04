import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('@pages/auth/login/page/login.page'),
  },
  {
    path: 'register',
    loadComponent: () => import('@pages/auth/register/page/register.page'),
  },
];

export default routes;
