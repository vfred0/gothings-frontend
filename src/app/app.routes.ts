import { Routes } from '@angular/router';
import { AppRoute } from '@core/enums/app-route';
import { userIsAuthenticated } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: AppRoute.Auth,
    loadChildren: () => import('@pages/auth/auth.routes'),
  },
  {
    path: '',
    loadChildren: () => import('@pages/article/article.routes'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: '',
    loadChildren: () => import('@pages/management/management.routes'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: AppRoute.Profile,
    loadComponent: () => import('@pages/profile/profile.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
