import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('@pages/auth/auth.routes'),
  },
  {
    path: 'profile',
    loadComponent: () => import('@pages/auth/profile/profile.page'),
  },
];
