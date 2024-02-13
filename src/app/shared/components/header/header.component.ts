import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Icon } from '@core/enums/icon';
import { AuthService } from '@shared/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeaderDetailComponent } from '@shared/components/header-detail/header-detail.component';
import {
  getRouteTitle,
  isArticleRoute,
  isHomeRoute,
  isWithBack,
  isWithPreferences,
  setRoute,
} from '@core/utils/app-route.util';
import { HeaderDetail } from '@core/models/header-detail';
import { AppRoute } from '@core/enums/app-route';
import { ButtonType } from '@core/enums/button-type';

@Component({
  selector: 'gothings-header',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ButtonComponent,
    NgOptimizedImage,
    HeaderDetailComponent,
    RouterLink,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  protected readonly ButtonType = ButtonType;
  protected readonly Icon = Icon;
  isForArticlePage: boolean;
  showPreferences: boolean;
  showHeader: boolean;
  isWithButtonEditProfile: boolean;
  isWithBack: boolean;
  headerDetail: HeaderDetail;

  @Input() isWithPreferences: boolean;
  valueTranslate: number;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.showPreferences = false;
    this.showHeader = false;
    this.isWithPreferences = false;
    this.isWithButtonEditProfile = false;
    this.isWithBack = false;
    this.isForArticlePage = false;
    this.headerDetail = {} as HeaderDetail;
    this.valueTranslate = 30;
  }

  ngOnInit(): void {
    function showHeader(event: NavigationEnd) {
      return !event.url.includes(AppRoute.Auth);
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && showHeader(event)) {
        this.showHeader = showHeader(event);
        const currentUrl = event.url;
        setRoute(currentUrl);
        this.isWithPreferences = isWithPreferences();
        this.isWithBack = isWithBack();
        this.headerDetail.title = this.authService.getUserNames();
        this.headerDetail.photo = this.authService.getUserPhoto();
        this.headerDetail.description = this.authService.getUserRol();
        if (!isHomeRoute()) {
          this.headerDetail.title = getRouteTitle();
        }
        this.isForArticlePage = isArticleRoute();
      }
    });
  }

  togglePreferences() {
    if (this.isWithPreferences) {
      this.showPreferences = !this.showPreferences;
    }
  }

  redirectToBack() {
    this.location.back();
  }

  navigateToEditProfile() {
    this.router
      .navigate([`${AppRoute.Profile}/${AppRoute.EditProfile}`])
      .then();
    this.togglePreferences();
  }

  onLogout() {
    window.location.reload();
    this.showHeader = false;
    this.authService.destroySession();
    this.router.navigate([AppRoute.AuthLogin]).then();
    this.togglePreferences();
  }

  get isWithButtonUserManagement(): boolean {
    return this.authService.isUserAdmin();
  }

  navigateToPublishArticle() {
    this.router.navigate([AppRoute.PublishArticle]).then();
    this.togglePreferences();
  }

  navigateToHome() {
    this.router.navigate([AppRoute.Home]).then();
    this.togglePreferences();
  }

  getValueTranslate() {
    if (this.isWithButtonUserManagement) {
      this.valueTranslate = 20;
    }
    return this.valueTranslate;
  }

  navigateToMyArticles() {
    this.router.navigate([AppRoute.MyArticles]).then();
    this.togglePreferences();
  }
}
