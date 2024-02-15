import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private readonly API_URL: string = environment.apiBaseUrl + '/user-accounts';
  private http: HttpClient = inject(HttpClient);
  private readonly authService: AuthService = inject(AuthService);

  private getToken() {
    return {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    };
  }

  addRoles(username: string, selectedRoles: string[]) {
    return this.http.put<void>(
      `${this.API_URL}/${username}/roles`,
      selectedRoles,
      this.getToken()
    );
  }

  removeRoles(username: string, roles: string[]) {
    const options = {
      headers: this.getToken().headers,
      body: roles,
    };
    return this.http.delete<void>(`${this.API_URL}/${username}/roles`, options);
  }
}
