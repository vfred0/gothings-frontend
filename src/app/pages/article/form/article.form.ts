import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { ButtonSelectImageComponent } from '@shared/components/button/button-select-image/button-select-image.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { getLayout } from '@shared/utils/app-route.util';
import { Icon } from '@core/enums/icon';
import { ButtonType } from '@core/enums/button-type';
import { getAllValues, getKey } from '@shared/utils/enum.util';
import { Category } from '@core/enums/category';
import { Category as CategoryType } from '@core/types/category.type';
import { State } from '@core/enums/state';
import { State as StateType } from '@core/types/state.type';
import { Gender } from '@core/enums/gender';
import { Gender as GenderType } from '@core/types/gender.type';

import { GalleryComponent } from '@shared/components/gallery/gallery.component';
import { ArticleFormModel } from '@core/models/article-form.model';
import { CategoryService } from '@shared/services/category/category.service';
import { ImageService } from '@shared/services/image.service';
import { ArticleService } from '@shared/services/article.service';
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';
import { Router } from '@angular/router';
import { AppRoute } from '@core/enums/app-route';

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
  @ViewChild(GalleryComponent) gallery!: GalleryComponent;
  formGroup: FormGroup;
  protected readonly Icon = Icon;
  categories: string[];
  genders: string[];
  states: string[];
  articleForm: ArticleFormModel;
  withGender: boolean;
  errorMessage: string;
  private readonly imageService: ImageService;
  private readonly articleService: ArticleService;
  private readonly router: Router;

  constructor() {
    this.categories = getAllValues(Category);
    this.states = getAllValues(State);
    this.formGroup = new FormGroup({});
    this.genders = getAllValues(Gender);
    this.articleForm = new ArticleFormModel();
    this.withGender = false;
    this.imageService = inject(ImageService);
    this.articleService = inject(ArticleService);
    this.router = inject(Router);
    this.errorMessage = '';
  }

  ngAfterViewInit() {
    this.formGroup.get('category')?.valueChanges.subscribe(category => {
      this.withGender = new CategoryService().isWithGender(category.select);
    });
  }

  publishArticle() {
    const articleRequestDto = this.getArticleRequestDto();
    this.articleService.save(articleRequestDto).subscribe({
      next: () => {
        this.router.navigate([AppRoute.Home]).then();
        this.formGroup.reset();
      },
      error: error => {
        this.errorMessage = error.error.message;
        console.error(error);
      },
    });
  }

  private getArticleRequestDto() {
    this.setValuesInArticleForm();
    const articleRequestDto: ArticleRequestDto = {
      title: this.articleForm.title,
      description: this.articleForm.description,
      category: getKey(Category, this.articleForm.category) as CategoryType,
      state: getKey(State, this.articleForm.state) as StateType,
      images: this.articleForm.images,
    };

    if (this.withGender) {
      articleRequestDto.gender = getKey(
        Gender,
        this.articleForm.gender
      ) as GenderType;
    }

    return articleRequestDto;
  }

  private setValuesInArticleForm() {
    this.articleForm.title = this.getInputValue('title');
    this.articleForm.description = this.getInputValue('description');
    this.articleForm.category = this.getSelectedValue('category');
    this.articleForm.state = this.getSelectedValue('state');
    if (this.withGender) {
      this.articleForm.gender = this.getSelectedValue('gender');
    }
  }

  get containsImages() {
    return this.articleForm.images.length > 0;
  }

  deleteImages() {
    this.articleForm.images = [];
  }

  onImageSelected(image: string) {
    this.imageService.uploadImage(image).subscribe({
      next: imageResponse => {
        this.articleForm.images.push(imageResponse.data.url);
        this.gallery.updateSlider();
      },
    });
  }

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
