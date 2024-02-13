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
    loadComponent: () =>
      import('@pages/article/explore-articles/explore-articles.page').then(
        m => m.ExploreArticlesPage
      ),
    canActivate: [userIsAuthenticated],
  },
  {
    path: AppRoute.Article,
    loadComponent: () => import('@pages/article/article.page'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: `${AppRoute.EditArticle}/:id`,
    loadComponent: () =>
      import('@pages/article/update-article/update-article.form'),
    canActivate: [userIsAuthenticated],
  },
  {
    path: AppRoute.PublishArticle,
    loadComponent: () => import('@pages/article/new-article/new-article.form'),
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
