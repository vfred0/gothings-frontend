import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { Icon } from '@core/enums/icon';
import { NavigationExtras, Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonType } from '@core/enums/button-type';
import { AppRoute } from '@core/enums/app-route';
import { ArticleCard } from '@core/models/article-card';

@Component({
  selector: 'gothings-article-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgOptimizedImage, ButtonComponent],
  templateUrl: './article-card.component.html',
})
export class ArticleCardComponent {
  @Input() articleCard: ArticleCard;
  protected readonly Icon = Icon;
  protected readonly ButtonType = ButtonType;

  constructor(protected router: Router) {
    this.articleCard = {} as ArticleCard;
  }

  navigateToViewArticle() {
    this.router
      .navigate([`${AppRoute.Article}/${this.articleCard.id}`], {
        state: { article: this.articleCard } as NavigationExtras,
      })
      .then();
  }
}
