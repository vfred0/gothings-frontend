import { AppRoutePage } from '@core/enums/app-route-page';

interface IRoute {
  path: string;
  title: string;
  withHeader: boolean;
  withBack: boolean;
  withPreferences: boolean;
  withPreferencesAndButtonEditProfile: boolean;
}

const routes: Array<IRoute> = [
  {
    path: AppRoutePage.Home,
    title: 'Inicio',
    withHeader: true,
    withBack: false,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: true,
  },
  {
    path: AppRoutePage.Article,
    title: 'Artículo',
    withHeader: true,
    withBack: true,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: true,
  },
  {
    path: AppRoutePage.PublishArticle,
    title: 'Publicar artículo',
    withHeader: true,
    withBack: false,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: true,
  },
  {
    path: AppRoutePage.EditArticle,
    title: 'Editar artículo',
    withHeader: true,
    withBack: true,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: true,
  },
  {
    path: AppRoutePage.Profile,
    title: 'Perfil',
    withHeader: true,
    withBack: false,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: true,
  },
  {
    path: AppRoutePage.ProfileEditProfile,
    title: 'Editar perfil',
    withHeader: true,
    withBack: true,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: false,
  },
  {
    path: AppRoutePage.MyArticles,
    title: 'Mis artículos',
    withHeader: true,
    withBack: true,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: false,
  },
  {
    path: AppRoutePage.UserManagement,
    title: 'Gestión de usuarios',
    withHeader: true,
    withBack: true,
    withPreferences: true,
    withPreferencesAndButtonEditProfile: false,
  },
];
let route = '';

function getCleanRoute(route: string): string {
  return route
    .replace(/^\/+/, '')
    .replace(/\/\w+-\w+-\w+-\w+-\w+\/?/g, '/')
    .replace(/\/$/, '');
}

export function setRoute(routeParam: string): void {
  route = getCleanRoute(routeParam);
}

export function isEqualsRoute(routeCompare: string): boolean {
  return routeCompare === route;
}

function getRoutePreference() {
  return routes.find(routePreference => route === routePreference.path);
}

export function isWithBack(): boolean {
  const routePreference = getRoutePreference();
  return routePreference ? routePreference.withBack : false;
}

export function isWithPreferences(): boolean {
  const routePreference = getRoutePreference();
  return routePreference ? routePreference.withPreferences : false;
}

export function isWithPreferencesAndButtonEditProfile(): boolean {
  const routePreference = getRoutePreference();
  return routePreference
    ? routePreference.withPreferencesAndButtonEditProfile
    : false;
}

export function isWithHeader(): boolean {
  const routePreference = getRoutePreference();
  return routePreference ? routePreference.withHeader : false;
}

export function getRouteTitle(): string {
  const routePreference = getRoutePreference();
  return routePreference ? routePreference.title : '';
}

export function isArticleRoute(): boolean {
  return route === AppRoutePage.Article;
}

export function isHomeRoute(): boolean {
  return route === AppRoutePage.Home;
}
