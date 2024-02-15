import { Routes } from '@angular/router';
import { AppRoutePage } from '@core/enums/app-route-page';

const routes: Routes = [
  {
    path: AppRoutePage.Login,
    loadComponent: () => import('@pages/auth/login/login.page'),
  },
  {
    path: AppRoutePage.Register,
    loadComponent: () => import('@pages/auth/register/register.page'),
  },
];

export default routes;
