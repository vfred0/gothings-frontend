import { Routes } from '@angular/router';
import { AppRoutePage } from '@core/enums/app-route-page';

export const routes: Routes = [
  {
    path: AppRoutePage.UserManagement,
    loadComponent: () =>
      import('@pages/management/user-management/user-management.page'),
  },
];

export default routes;
