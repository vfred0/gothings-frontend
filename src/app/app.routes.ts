import { Routes } from '@angular/router';
import { AppRoute } from '@core/enums/app-route';
import { userIsAuthenticated } from '@shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: AppRoute.Auth,
    loadChildren: () => import('@pages/auth/auth.routes'),
  },
  {
    path: AppRoute.Home,
    loadComponent: () => import('@pages/home/home.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: AppRoute.Article,
    loadComponent: () => import('@pages/article/article.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: AppRoute.EditProfile,
    loadComponent: () => import('@pages/profile/profile.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: AppRoute.PublishArticle,
    loadComponent: () => import('@pages/article/form/article.form'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: AppRoute.PublishArticle,
    loadComponent: () => import('@pages/article/form/article.form'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: `${AppRoute.Article}/:id`,
    loadComponent: () => import('@pages/article/article.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
