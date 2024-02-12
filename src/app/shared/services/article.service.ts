import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment.development';
import { HttpClient } from '@angular/common/http';
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';
import { AuthService } from '@shared/services/auth.service';
import { ArticleResponseDto } from '@core/dtos/article/article-response.dto';
import { FilterArticleDto } from '@core/dtos/article/filter-article.dto';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly API_URL: string = environment.apiBaseUrl + '/articles';
  private http: HttpClient = inject(HttpClient);
  private readonly authService: AuthService = inject(AuthService);

  save(articleRequestDto: ArticleRequestDto) {
    return this.http.post<void>(
      `${this.API_URL}/${this.authService.getUserId()}`,
      articleRequestDto,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }

  search(filterArticle: FilterArticleDto) {
    return this.http.get<Array<ArticleResponseDto>>(
      `${this.API_URL}/search?title=${filterArticle.title}&category=${filterArticle.category}&state=${filterArticle.state}`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
