import { Routes } from '@angular/router';
import { RoutePage } from '@core/enums/route-page';

export const routes: Routes = [
  {
    path: RoutePage.Home,
    loadComponent: () =>
      import('@pages/article/views/explore-articles/explore-articles.page'),
  },
  {
    path: RoutePage.Article,
    loadComponent: () =>
      import('@pages/article/views/article-page/article.page'),
  },
  {
    path: `${RoutePage.EditArticle}/:id`,
    loadComponent: () =>
      import('@pages/article/management/update-article/update-article.form'),
  },
  {
    path: RoutePage.PublishArticle,
    loadComponent: () =>
      import('@pages/article/management/new-article/new-article.form'),
  },
  {
    path: `${RoutePage.Article}/:id`,
    loadComponent: () =>
      import('@pages/article/views/article-page/article.page'),
  },

  {
    path: `${RoutePage.MyArticles}`,
    loadComponent: () =>
      import('@pages/article/views/my-articles/my-articles.page'),
  },
];

export default routes;
