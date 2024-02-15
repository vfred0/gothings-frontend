import { Component } from '@angular/core';
import ArticleForm from '@pages/article/management/article-form/article.form';
import { ArticleCard } from '@core/models/article-card';
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';
import { AppRoute } from '@core/enums/app-route';

@Component({
  standalone: true,
  imports: [ArticleForm],
  templateUrl: './update-article.form.html',
})
export default class UpdateArticleForm extends ArticleForm {
  constructor() {
    super();
    const articleCard: ArticleCard = this.router.getCurrentNavigation()!.extras
      .state!['article'] as ArticleCard;

    this.articleForm.id = articleCard.id;
    this.articleForm.title = articleCard.title;
    this.articleForm.description = articleCard.description;
    this.articleForm.category = articleCard.category;
    this.articleForm.state = articleCard.state;
    this.articleForm.images = articleCard.images;

    if (this.withGender) {
      this.articleForm.gender = articleCard.gender;
    }
  }

  updateArticle(articleRequestDto: ArticleRequestDto) {
    this.articleService.update(articleRequestDto).subscribe({
      next: () => {
        this.router.navigate([AppRoute.Home]).then();
      },
      error: error => {
        this.errorMessage = error.error.message;
        console.error(error);
      },
    });
  }
}
