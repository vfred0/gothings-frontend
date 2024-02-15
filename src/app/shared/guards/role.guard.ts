import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { RoutePage } from '@core/enums/route-page';

export const userGrantedAccess: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const isAdmin = authService.isUserAdmin();
  if (!isAdmin) {
    router.navigate([RoutePage.Home]).then();
  }

  return isAdmin;
};
