import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavigationEnd, Router } from '@angular/router';
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
    this.authService.destroySession();
    this.router.navigate([AppRoute.AuthLogin]).then();
    this.togglePreferences();
  }

  onClickedPhoto() {}

  get isWithButtonUserManagement(): boolean {
    return this.authService.isUserAdmin();
  }
}
