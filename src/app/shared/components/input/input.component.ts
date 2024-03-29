import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { Icon } from '@core/enums/icon';

@Component({
  standalone: true,
  selector: 'gothings-input',
  imports: [AngularSvgIconModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() title!: string;
  @Input() icon: Icon;
  @Input() value!: string;
  @Input() errorMessage!: string;
  @Input() placeholder!: string;
  @Input() type: string;
  @Input() isTextArea!: boolean;
  @Input() validators!: ValidatorFn[];
  @Output() showError: EventEmitter<boolean>;
  @Input() formGroupName!: string;
  private inputForm: FormGroup;
  parentContainer: ControlContainer;

  constructor() {
    this.icon = Icon.Search;
    this.type = 'text';
    this.showError = new EventEmitter<boolean>();
    this.inputForm = new FormGroup({});
    this.parentContainer = inject(ControlContainer);
  }

  ngOnInit() {
    this.inputForm = new FormGroup({
      inputValue: new FormControl(this.value, this.validators),
    });

    this.getControl().addControl(this.formGroupName, this.inputForm);
  }

  ngOnDestroy() {
    this.getControl().removeControl(this.formGroupName);
  }

  private getControl() {
    return this.parentContainer.control as FormGroup;
  }

  get inputValue(): FormControl {
    return this.inputForm.get('inputValue') as FormControl;
  }

  get withTitle(): boolean {
    return this.title !== '';
  }

  getMessagePlaceholder() {
    if (this.showError && this.inputForm.dirty) {
      return this.errorMessage;
    }
    return this.placeholder;
  }
}
