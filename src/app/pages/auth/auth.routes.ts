import { Routes } from '@angular/router';
import { RoutePage } from '@core/enums/route-page';

const routes: Routes = [
  {
    path: RoutePage.Login,
    loadComponent: () => import('@pages/auth/login/login.page'),
  },
  {
    path: RoutePage.Register,
    loadComponent: () => import('@pages/auth/register/register.page'),
  },
];

export default routes;
