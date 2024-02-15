import { Routes } from '@angular/router';
import { RoutePage } from '@core/enums/route-page';

export const routes: Routes = [
  {
    path: RoutePage.UserManagement,
    loadComponent: () =>
      import('@pages/management/user-management/user-management.page'),
  },
];

export default routes;
