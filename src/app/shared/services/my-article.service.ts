import { FilterArticleDto } from '@core/dtos/article/filter-article.dto';
import { inject, Injectable } from '@angular/core';
import { Service } from '@shared/services/service';
import { ArticleResponseDto } from '@core/dtos/article/article-response.dto';
import { ArticleService } from '@shared/services/article.service';
import { map } from 'rxjs';
import { ArticleCard } from '@core/models/article-card';
import { UserService } from '@shared/services/user.service';

@Injectable({ providedIn: 'root' })
export class MyArticleService extends Service<ArticleCard[]> {
  private readonly articleService: ArticleService = inject(ArticleService);
  private readonly userService: UserService = inject(UserService);

  constructor() {
    super([] as ArticleCard[]);
  }

  get totalArticlesCards(): number {
    return this.articlesCards.length;
  }

  get articlesCards() {
    return this.result();
  }

  search(filterArticle: FilterArticleDto): void {
    const request = this.articleService.searchByUserId(filterArticle).pipe(
      map((articles: ArticleResponseDto[]) => {
        return articles.map((article: ArticleResponseDto) => {
          return new ArticleCard(article);
        });
      })
    );
    this.execute(request);
  }

  getAll() {
    const request = this.userService.getArticles().pipe(
      map((articles: ArticleResponseDto[]) => {
        return articles.map((article: ArticleResponseDto) => {
          return new ArticleCard(article);
        });
      })
    );
    this.execute(request);
  }
}
