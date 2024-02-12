import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gothings-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GalleryComponent {
  @Input() images: Array<string>;

  constructor(private renderer: Renderer2) {
    this.images = [];
  }

  updateSlider() {
    const swiperContainer = document.querySelector('swiper-container');
    const hasMoreThanTwoImages = this.images.length > 1;
    const className = 'swiper-backface-hidden';
    if (hasMoreThanTwoImages) {
      this.renderer.removeClass(swiperContainer, className);
    } else {
      this.renderer.addClass(swiperContainer, className);
    }
  }
}
