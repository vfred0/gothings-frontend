import { Routes } from '@angular/router';
import { AppRoutePage } from '@core/enums/app-route-page';

export const routes: Routes = [
  {
    path: AppRoutePage.Home,
    loadComponent: () =>
      import('@pages/article/views/explore-articles/explore-articles.page'),
  },
  {
    path: AppRoutePage.Article,
    loadComponent: () =>
      import('@pages/article/views/article-page/article.page'),
  },
  {
    path: `${AppRoutePage.EditArticle}/:id`,
    loadComponent: () =>
      import('@pages/article/management/update-article/update-article.form'),
  },
  {
    path: AppRoutePage.PublishArticle,
    loadComponent: () =>
      import('@pages/article/management/new-article/new-article.form'),
  },
  {
    path: `${AppRoutePage.Article}/:id`,
    loadComponent: () =>
      import('@pages/article/views/article-page/article.page'),
  },

  {
    path: `${AppRoutePage.MyArticles}`,
    loadComponent: () =>
      import('@pages/article/views/my-articles/my-articles.page'),
  },
];

export default routes;
