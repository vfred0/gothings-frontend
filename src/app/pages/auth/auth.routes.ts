import { Routes } from '@angular/router';
import { AppRoute } from '@core/enums/app-route';

const routes: Routes = [
  {
    path: AppRoute.Login,
    loadComponent: () => import('@pages/auth/login/login.page'),
  },
  {
    path: AppRoute.Register,
    loadComponent: () => import('@pages/auth/register/register.page'),
  },
];

export default routes;
