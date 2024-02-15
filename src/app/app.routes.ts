import { Routes } from '@angular/router';
import { RoutePage } from '@core/enums/route-page';
import { userIsAuthenticated } from '@shared/guards/auth.guard';
import { userGrantedAccess } from '@shared/guards/role.guard';

export const routes: Routes = [
  {
    path: RoutePage.Auth,
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
    path: RoutePage.Profile,
    loadComponent: () => import('@pages/profile/profile.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
