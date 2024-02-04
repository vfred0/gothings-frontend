import { environment } from '@env/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequestDto } from '@core/dtos/auth/login-request.dto';
import { RegisterRequestDto } from '@core/dtos/auth/register-request.dto';
import { Observable, tap } from 'rxjs';
import { AccessTokenDto } from '@core/dtos/auth/access-token.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL: string = environment.apiBaseUrl + '/auth';
  private http: HttpClient = inject(HttpClient);

  login(loginRequestDto: LoginRequestDto): Observable<AccessTokenDto> {
    return this.http
      .post<AccessTokenDto>(`${this.API_URL}/login`, loginRequestDto)
      .pipe(
        tap((accessTokenDto: AccessTokenDto) => {
          localStorage.setItem('accessToken', accessTokenDto.token);
          this.decodeToken(accessTokenDto.token);
        })
      );
  }

  register(registerRequestDto: RegisterRequestDto): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/register`, registerRequestDto);
  }

  private decodeToken(token: string) {
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('username', tokenPayload.sub);
    localStorage.setItem('id', tokenPayload.id);
    localStorage.setItem('names', tokenPayload.names);
    localStorage.setItem('roles', tokenPayload.roles);
    console.log('Token decoded:', tokenPayload);
  }
}
