import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonType, isBack, isTag } from '@core/enums/button-type';

@Component({
  selector: 'gothings-button',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() description: string;
  @Input() buttonType: ButtonType;
  @Input() icon: string;
  @Input() isDisabled!: boolean;
  @Input() selected!: boolean;

  constructor() {
    this.buttonType = ButtonType.Primary;
    this.description = this.buttonType;
    this.icon = 'hand';
  }

  get fontSize(): string {
    if (isTag(this.buttonType)) {
      return 'sm-semibold';
    }
    return 'base-semibold';
  }

  get iconSize(): string {
    if (isTag(this.buttonType)) {
      return 'sm';
    }
    return 'lg';
  }

  get isBack(): boolean {
    return isBack(this.buttonType);
  }

  getStyleButton(): string {
    const clazz = 'c-button--';
    if (this.isDisabled) {
      return clazz.concat('disabled');
    }
    if (this.selected) {
      return clazz.concat('selected');
    }

    return '';
  }
}
