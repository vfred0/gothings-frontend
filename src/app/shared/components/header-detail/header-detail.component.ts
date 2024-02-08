import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDetail } from '@core/utils/header-detail';

@Component({
  selector: 'app-header-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-detail.component.html',
})
export class HeaderDetailComponent {
  @Input() headerDetail: HeaderDetail;
  @Input() withDescription: boolean;
  @Input() withClickedPhoto: boolean;
  @Output() clickedPhoto: EventEmitter<void>;

  constructor() {
    this.headerDetail = {} as HeaderDetail;
    this.clickedPhoto = new EventEmitter<void>();
    this.withDescription = false;
    this.withClickedPhoto = false;
  }

  onClickedPhoto() {
    if (this.withClickedPhoto) {
      this.clickedPhoto.emit();
    }
  }
}
