import { Routes } from '@angular/router';
import { userIsAuthenticated } from '@shared/guards/auth.guard';
import { AppRoute } from '@core/enums/app-route';

export const routes: Routes = [
  {
    path: AppRoute.Auth,
    loadChildren: () => import('@pages/auth/auth.routes'),
  },
  {
    path: AppRoute.Home,
    loadComponent: () => import('@pages/auth/profile/profile.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
