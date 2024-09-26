import { Component } from '@angular/core';
import ArticleForm from '@pages/article/management/article-form/article.form';
import { ArticleCard } from '@core/models/article-card';
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';
import { RoutePage } from '@core/enums/route-page';
import { CategoryService } from '@shared/services/category/category.service';

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
    this.articleForm = articleCard.toArticleRequestDto();
    this.isWithGender = new CategoryService().isWithGender(
      articleCard.category
    );
    if (this.isWithGender) {
      this.articleForm.gender = articleCard.gender;
    } else {
      delete this.articleForm.gender;
    }
  }

  updateArticle(articleRequestDto: ArticleRequestDto) {
    this.articleService.update(articleRequestDto).subscribe({
      next: () => {
        this.router.navigate([RoutePage.Home]).then();
      },
      error: error => {
        this.errorMessage = error.error.message;
        console.error(error);
      },
    });
  }
}
