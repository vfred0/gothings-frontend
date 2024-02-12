import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderDetail } from '@core/models/header-detail';

@Component({
  selector: 'gothings-header-detail',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './header-detail.component.html',
})
export class HeaderDetailComponent implements OnInit {
  @Input() headerDetail: HeaderDetail;
  @Input() withDescription: boolean;
  @Input() withClickedPhoto: boolean;
  @Output() clickedPhoto: EventEmitter<void>;

  constructor() {
    this.headerDetail = {} as HeaderDetail;
    this.clickedPhoto = new EventEmitter<void>();
    this.withDescription = false;
    this.withClickedPhoto = true;
  }

  onClickedPhoto() {
    if (this.withClickedPhoto) {
      this.clickedPhoto.emit();
    }
  }

  ngOnInit(): void {
    if (this.headerDetail.description === undefined) {
      this.headerDetail.description = '';
    }

    if (this.headerDetail.photo !== '') {
      this.withDescription = true;
    }
  }

  isAdmin() {
    return this.headerDetail.description.includes('ROLE_ADMIN');
  }
}
