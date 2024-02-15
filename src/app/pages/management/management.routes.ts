import { Routes } from '@angular/router';
import { AppRoute } from '@core/enums/app-route';

export const routes: Routes = [
  {
    path: AppRoute.UserManagement,
    loadComponent: () =>
      import('@pages/management/user-management/user-management.page'),
  },
];

export default routes;
