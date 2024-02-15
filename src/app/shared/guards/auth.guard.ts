import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { AppRoutePage } from '@core/enums/app-route-page';

export const userIsAuthenticated: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const authenticated = authService.isValidSession();
  if (!authenticated) {
    router.navigate([AppRoutePage.AuthLogin]).then();
  }
  return authenticated;
};
