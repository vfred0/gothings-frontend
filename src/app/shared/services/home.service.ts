import { FilterArticleDto } from '@core/dtos/article/filter-article.dto';
import { inject, Injectable } from '@angular/core';
import { Service } from '@shared/services/service';
import { ArticleResponseDto } from '@core/dtos/article/article-response.dto';
import { ArticleService } from '@shared/services/article.service';
import { map } from 'rxjs';
import { ArticleCard } from '@core/models/article-card';

@Injectable({ providedIn: 'root' })
export class HomeService extends Service<ArticleCard[]> {
  private articleService: ArticleService = inject(ArticleService);

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
    const request = this.articleService.search(filterArticle).pipe(
      map((articles: ArticleResponseDto[]) => {
        return articles.map((article: ArticleResponseDto) => {
          return new ArticleCard(article);
        });
      })
    );
    this.execute(request);
  }

  showAll() {
    const request = this.articleService.getAll().pipe(
      map((articles: ArticleResponseDto[]) => {
        return articles.map((article: ArticleResponseDto) => {
          return new ArticleCard(article);
        });
      })
    );
    this.execute(request);
  }
}
