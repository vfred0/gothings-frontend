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
    loadChildren: () => import('@pages/article/article.routes'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: `${AppRoute.Article}/:id`,
    loadComponent: () => import('@pages/article/article.page'),
    canActivate: [userIsAuthenticated],
  },

  {
    path: `${AppRoute.MyArticles}`,
    loadComponent: () => import('@pages/article/my-articles/my-articles.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
