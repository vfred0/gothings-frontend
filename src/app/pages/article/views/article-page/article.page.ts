import { Component, inject } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Router } from '@angular/router';
import { ArticleCard } from '@core/models/article-card';
import { AuthService } from '@shared/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeaderDetailComponent } from '@shared/components/header-detail/header-detail.component';
import { GalleryComponent } from '@shared/components/gallery/gallery.component';
import { Icon } from '@core/enums/icon';
import { ButtonType } from '@core/enums/button-type';
import { HeaderDetail } from '@core/models/header-detail';
import { RoutePage } from '@core/enums/route-page';
import { ArticleService } from '@shared/services/article.service';
import { ParseDate } from '@core/utils/parse-date';

@Component({
  selector: 'gothings-article',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    HeaderDetailComponent,
    GalleryComponent,
  ],
  templateUrl: './article.page.html',
})
export default class ArticlePage {
  private readonly router: Router;
  private readonly authService: AuthService;
  protected readonly Icon = Icon;
  protected readonly ButtonType = ButtonType;
  readonly articleCard: ArticleCard;
  headerDetail: HeaderDetail;
  private articleService: ArticleService;

  constructor() {
    this.router = inject(Router);
    this.authService = inject(AuthService);
    this.articleService = inject(ArticleService);
    this.articleCard = this.router.getCurrentNavigation()!.extras.state![
      'article'
    ] as ArticleCard;
    this.headerDetail = {} as HeaderDetail;
    this.headerDetail.title = this.articleCard.user.names;
    this.headerDetail.description = 'Registrado '.concat(
      ParseDate.toRelativeTime(this.articleCard.user.createdAt)
    );
    this.headerDetail.photo = this.authService.user.photo;
  }

  onContactWhatsApp() {}

  isCurrentUserArticle() {
    return this.authService.isCurrentUser(this.articleCard.user.id);
  }

  onEditArticle() {
    this.router
      .navigate([RoutePage.EditArticle, this.articleCard.id], {
        state: { article: this.articleCard },
      })
      .then();
  }

  onDeleteArticle() {
    this.articleService.deleteById(this.articleCard.id).subscribe();
    this.router.navigate([RoutePage.Home]).then();
  }
}
