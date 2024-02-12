import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@shared/components/header/header.component';

@Component({
  selector: 'gothings-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <gothings-header />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {}
