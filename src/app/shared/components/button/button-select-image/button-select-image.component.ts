import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Icon } from '@core/enums/icon';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonType } from '@core/enums/button-type';

@Component({
  selector: 'gothings-button-select-image',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ButtonComponent],
  templateUrl: './button-select-image.component.html',
})
export class ButtonSelectImageComponent {
  image: string;
  protected readonly Icon = Icon;
  protected readonly ButtonType = ButtonType;

  @Output() imageSelected: EventEmitter<string>;

  constructor() {
    this.imageSelected = new EventEmitter<string>();
    this.image = '';
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement?.files;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
        this.imageSelected.emit(this.image);
      };
      reader.readAsDataURL(file);
    }
  }
}
