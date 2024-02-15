import { Routes } from '@angular/router';
import { AppRoutePage } from '@core/enums/app-route-page';
import { userIsAuthenticated } from '@shared/guards/auth.guard';
import { userGrantedAccess } from '@shared/guards/role.guard';

export const routes: Routes = [
  {
    path: AppRoutePage.Auth,
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
    canActivate: [userIsAuthenticated, userGrantedAccess],
  },
  {
    path: AppRoutePage.Profile,
    loadComponent: () => import('@pages/profile/profile.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
