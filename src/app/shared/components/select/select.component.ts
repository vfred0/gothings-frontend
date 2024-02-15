import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Category } from '@core/enums/category';
import { CategoryService } from '@shared/services/category/category.service';

@Component({
  standalone: true,
  selector: 'gothings-select',
  imports: [CommonModule, ReactiveFormsModule, AngularSvgIconModule],
  templateUrl: './select.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class SelectComponent implements OnInit, OnDestroy {
  @Input() options: string[];
  @Input() optionSelected: string;
  @Input() title: string;
  @Input() label: string;
  @Input() formGroupName: string;
  categoryIncludes: string;
  formSelect: FormGroup;
  parentContainer: ControlContainer;

  constructor() {
    this.title = '';
    this.label = '';
    this.options = [];
    this.formSelect = new FormGroup({});
    this.optionSelected = '';
    this.categoryIncludes = '';
    this.parentContainer = inject(ControlContainer);
    this.formGroupName = '';
  }

  get withTitle(): boolean {
    return this.title !== '';
  }

  get withIncludes(): boolean {
    return this.categoryIncludes !== '';
  }

  ngOnInit(): void {
    if (!this.optionSelected) {
      this.optionSelected = this.options[0];
    }
    this.formSelect = new FormGroup({
      select: new FormControl(this.optionSelected, [Validators.required]),
    });

    this.getControl().addControl(this.formGroupName, this.formSelect);

    this.formSelect.get('select')?.valueChanges.subscribe(optionSelected => {
      this.updateCategoryIncludes(optionSelected);
    });
    this.updateCategoryIncludes(this.optionSelected);
  }

  private updateCategoryIncludes(optionSelected: string) {
    if (optionSelected !== undefined) {
      this.categoryIncludes = new CategoryService().getIncludes(
        optionSelected as Category
      );
    }
  }

  ngOnDestroy() {
    //this.getControl().removeControl(this.formGroupName);
  }

  private getControl() {
    return this.parentContainer.control as FormGroup;
  }
}
