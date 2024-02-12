import { environment } from '@env/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequestDto } from '@core/dtos/auth/login-request.dto';
import { RegisterRequestDto } from '@core/dtos/auth/register-request.dto';
import { Observable, tap } from 'rxjs';
import { AccessTokenDto } from '@core/dtos/auth/access-token.dto';
import { Session } from '@core/models/session';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL: string = environment.apiBaseUrl + '/auth';
  private http: HttpClient = inject(HttpClient);
  private session: Session;
  private jwtHelperService: JwtHelperService;

  constructor() {
    this.jwtHelperService = new JwtHelperService();
    this.session = this.getLocalSession();
  }

  login(loginRequestDto: LoginRequestDto): Observable<AccessTokenDto> {
    return this.http
      .post<AccessTokenDto>(`${this.API_URL}/login`, loginRequestDto)
      .pipe(
        tap((accessTokenDto: AccessTokenDto) => {
          this.saveSessionFromToken(accessTokenDto.token);
        })
      );
  }

  register(registerRequestDto: RegisterRequestDto): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/register`, registerRequestDto);
  }

  private saveSessionFromToken(token: string) {
    const decodeToken = this.jwtHelperService.decodeToken(token);
    this.session.id = decodeToken.id;
    this.session.names = decodeToken.names;
    this.session.username = decodeToken.sub;
    this.session.roles = decodeToken.scope;
    this.session.photo = decodeToken.photo;
    if (this.session.photo === '') {
      this.session.photo = 'assets/default-profile.jpg';
    }
    this.session.token = token;
    localStorage.setItem('session', JSON.stringify(this.session));
  }

  existsUser() {
    return this.session != null;
  }

  destroySession() {
    this.session = {} as Session;
    localStorage.removeItem('session');
  }

  isValidSession(): boolean {
    return (
      this.existsSession() &&
      !this.jwtHelperService.isTokenExpired(this.session.token)
    );
  }

  private getLocalSession(): Session {
    const sessionInLocalStorage = localStorage.getItem('session');
    if (sessionInLocalStorage && sessionInLocalStorage !== 'undefined') {
      return JSON.parse(sessionInLocalStorage);
    }
    return {} as Session;
  }

  private existsSession() {
    return Object.keys(this.session).length !== 0;
  }

  getUserNames() {
    return this.session.names;
  }

  getUserPhoto() {
    return this.session.photo;
  }

  isUserAdmin() {
    const token = this.session.token;
    return this.jwtHelperService.decodeToken(token).scope.includes('admin');
  }

  getUserRol(): string {
    return this.session.roles.join(', ');
  }

  getUserId() {
    return this.session.id;
  }

  getToken() {
    return this.session.token;
  }

  isCurrentUser(userId: string) {
    return this.session.id === userId;
  }
}
