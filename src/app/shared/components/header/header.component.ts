import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Icon } from '@core/enums/icon';
import { AuthService } from '@shared/services/auth.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeaderDetailComponent } from '@shared/components/header-detail/header-detail.component';
import { HeaderDetail } from '@core/models/header-detail';
import { RoutePage } from '@core/enums/route-page';
import { ButtonType } from '@core/enums/button-type';
import { RoutePageUtil } from '@core/utils/route-page.util';

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
  isForArticlePage!: boolean;
  _showHeader!: boolean;
  isWithBack!: boolean;
  headerDetail: HeaderDetail;

  @Input() isWithPreferences!: boolean;
  valueTranslate: number;
  showPreferences!: boolean;

  protected readonly ButtonType = ButtonType;
  protected readonly Icon = Icon;
  protected readonly AppRoutePage = RoutePage;
  private readonly routePage: RoutePageUtil;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.headerDetail = {} as HeaderDetail;
    this.valueTranslate = 30;
    this.routePage = new RoutePageUtil();
  }

  private showHeader(event: NavigationEnd) {
    return !event.url.includes(RoutePage.Auth);
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && this.showHeader(event)) {
        this._showHeader = this.showHeader(event);
        const currentUrl = event.url;
        this.routePage.setRoute(currentUrl);
        this.isWithBack = this.routePage.isWithBack();
        this.headerDetail.title = this.authService.user.names;
        this.headerDetail.photo = this.authService.user.photo;
        this.headerDetail.description = this.authService.getUserRol();
        if (!this.routePage.isHomeRoute()) {
          this.headerDetail.title = this.routePage.getRouteTitle();
        }
        this.isForArticlePage = this.routePage.isArticleRoute();
      }
    });
  }

  togglePreferences() {
    this.showPreferences = !this.showPreferences;
  }

  redirectToBack() {
    this.location.back();
  }

  navigateTo(routePage: RoutePage) {
    this.router.navigate([routePage]).then();
    this.togglePreferences();
  }

  onLogout() {
    window.location.reload();
    this._showHeader = false;
    this.authService.destroySession();
    this.navigateTo(RoutePage.AuthLogin);
  }

  get isWithButtonUserManagement(): boolean {
    return this.authService.isUserAdmin();
  }

  getValueTranslate() {
    if (this.isWithButtonUserManagement) {
      this.valueTranslate = 20;
    }
    return this.valueTranslate;
  }
}
