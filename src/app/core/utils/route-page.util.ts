import { RoutePage } from '@core/enums/route-page';

interface IRoutePage {
  path: string;
  title: string;
  withBack: boolean;
}

export class RoutePageUtil {
  routes: Array<IRoutePage>;
  route: string;
  constructor() {
    this.route = '';
    this.routes = [
      {
        path: RoutePage.Home,
        title: 'Inicio',
        withBack: false,
      },
      {
        path: RoutePage.Article,
        title: 'Artículo',
        withBack: true,
      },
      {
        path: RoutePage.PublishArticle,
        title: 'Publicar artículo',
        withBack: false,
      },
      {
        path: RoutePage.EditArticle,
        title: 'Editar artículo',
        withBack: true,
      },
      {
        path: RoutePage.Profile,
        title: 'Perfil',
        withBack: false,
      },
      {
        path: RoutePage.MyArticles,
        title: 'Mis artículos',
        withBack: true,
      },
      {
        path: RoutePage.UserManagement,
        title: 'Gestión de usuarios',
        withBack: true,
      },
    ];
  }

  getCleanRoute(route: string): string {
    return route
      .replace(/^\/+/, '')
      .replace(/\/\w+-\w+-\w+-\w+-\w+\/?/g, '/')
      .replace(/\/$/, '');
  }

  setRoute(routeParam: string): void {
    this.route = this.getCleanRoute(routeParam);
  }

  getRoutePreference() {
    return this.routes.find(routePreference => this.route === routePreference.path);
  }

  isWithBack(): boolean {
    const routePreference = this.getRoutePreference();
    return routePreference ? routePreference.withBack : false;
  }

  getRouteTitle(): string {
    const routePreference = this.getRoutePreference();
    return routePreference ? routePreference.title : '';
  }

  isArticleRoute(): boolean {
    return this.route === RoutePage.Article;
  }

  isHomeRoute(): boolean {
    return this.route === RoutePage.Home;
  }

}
