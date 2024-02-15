import { Routes } from '@angular/router';
import { AppRoute } from '@core/enums/app-route';

export const routes: Routes = [
  {
    path: AppRoute.Home,
    loadComponent: () =>
      import(
        '@pages/article/views/explore-articles/explore-articles.page'
      ).then(m => m.ExploreArticlesPage),
  },
  {
    path: AppRoute.Article,
    loadComponent: () =>
      import('@pages/article/views/article-page/article.page'),
  },
  {
    path: `${AppRoute.EditArticle}/:id`,
    loadComponent: () =>
      import('@pages/article/management/update-article/update-article.form'),
  },
  {
    path: AppRoute.PublishArticle,
    loadComponent: () =>
      import('@pages/article/management/new-article/new-article.form'),
  },
  {
    path: `${AppRoute.Article}/:id`,
    loadComponent: () =>
      import('@pages/article/views/article-page/article.page'),
  },

  {
    path: `${AppRoute.MyArticles}`,
    loadComponent: () =>
      import('@pages/article/views/my-articles/my-articles.page'),
  },
];

export default routes;