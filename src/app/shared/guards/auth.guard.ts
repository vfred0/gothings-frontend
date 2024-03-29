import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { RoutePage } from '@core/enums/route-page';

export const userIsAuthenticated: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const authenticated = authService.isValidSession();
  if (!authenticated) {
    router.navigate([RoutePage.AuthLogin]).then();
  }
  return authenticated;
};
