import { Component } from '@angular/core';
import ArticleForm from '@pages/article/article-form/article.form';
import { AppRoute } from '@core/enums/app-route';
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';

@Component({
  standalone: true,
  imports: [ArticleForm],
  templateUrl: './new-article.form.html',
})
export default class NewArticleForm extends ArticleForm {
  constructor() {
    super();
  }

  publishArticle(articleRequestDto: ArticleRequestDto) {
    this.articleService.save(articleRequestDto).subscribe({
      next: () => {
        this.router.navigate([AppRoute.Home]).then();
        this.formGroup.reset();
      },
      error: error => {
        this.errorMessage = error.error.message;
        console.error(error);
      },
    });
  }
}
