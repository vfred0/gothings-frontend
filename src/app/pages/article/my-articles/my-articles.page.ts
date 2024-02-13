import { Component, inject } from '@angular/core';

import { MyArticleService } from '@shared/services/my-article.service';
import { ExploreArticlesPage } from '@pages/article/explore-articles/explore-articles.page';

@Component({
  standalone: true,
  imports: [ExploreArticlesPage],
  templateUrl: './my-articles.page.html',
})
export default class MyArticlesPage extends ExploreArticlesPage {
  constructor() {
    super();
    this.service = inject(MyArticleService);
  }
}
