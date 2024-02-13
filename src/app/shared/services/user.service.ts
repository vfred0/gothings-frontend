import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';
import { ArticleResponseDto } from '@core/dtos/article/article-response.dto';
import { UserDto } from '@core/dtos/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL: string = environment.apiBaseUrl + '/users';
  private http: HttpClient = inject(HttpClient);
  private readonly authService: AuthService = inject(AuthService);

  private getToken() {
    return {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    };
  }

  getArticles() {
    return this.http.get<Array<ArticleResponseDto>>(
      `${this.API_URL}/${this.authService.getUserId()}/articles`,
      this.getToken()
    );
  }

  editProfile(userDto: UserDto) {
    return this.http.put<void>(
      `${this.API_URL}/${this.authService.getUserId()}`,
      userDto,
      this.getToken()
    );
  }
}
