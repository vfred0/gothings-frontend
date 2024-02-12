import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { ButtonSelectImageComponent } from '@shared/components/button/button-select-image/button-select-image.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { getLayout } from '@shared/utils/app-route.util';
import { Icon } from '@core/enums/icon';
import { ButtonType } from '@core/enums/button-type';
import { getAllValues } from '@shared/utils/enum.util';
import { Category } from '@core/enums/category';
import { State } from '@core/enums/state';
import { Gender } from '@core/enums/gender';
import { GalleryComponent } from '@shared/components/gallery/gallery.component';
import { ArticleFormModel } from '@core/models/article-form.model';
import { CategoryService } from '@shared/services/category/category.service';

@Component({
  standalone: true,
  imports: [
    InputComponent,
    SelectComponent,
    ButtonSelectImageComponent,
    ButtonComponent,
    ReactiveFormsModule,
    GalleryComponent,
  ],
  templateUrl: './article.form.html',
})
export default class ArticleForm implements AfterViewInit {
  protected readonly Validators = Validators;
  protected readonly getLayout = getLayout;
  protected readonly ButtonType = ButtonType;
  formGroup: FormGroup;
  protected readonly Icon = Icon;
  categories: string[];
  genders: string[];
  states: string[];
  articleForm: ArticleFormModel;
  withGender: boolean;

  constructor() {
    this.categories = getAllValues(Category);
    this.states = getAllValues(State);
    this.formGroup = new FormGroup({});
    this.genders = getAllValues(Gender);
    this.articleForm = new ArticleFormModel();
    this.withGender = false;
  }

  ngAfterViewInit() {
    this.formGroup.get('category')?.valueChanges.subscribe(category => {
      this.withGender = new CategoryService().isWithGender(category.select);
      console.log('WithGender:', this.withGender);
    });
  }

  publishArticle() {
    console.log('ArticleFormModel', this.formGroup.value);
  }

  get containsImages() {
    return this.articleForm.images.length > 0;
  }

  deleteImages() {
    this.articleForm.images = [];
  }

  onImageSelected(image: string) {}

  private getInputValue(value: string) {
    return this.formGroup.get(value)?.value.inputValue;
  }

  private getSelectedValue(value: string) {
    return this.formGroup.get(value)?.value.select;
  }

  isInvalid(value: string) {
    return (
      this.formGroup.get(value)?.touched && this.formGroup.get(value)?.invalid
    );
  }
}
