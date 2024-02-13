import {
  AfterViewInit,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { ButtonSelectImageComponent } from '@shared/components/button/button-select-image/button-select-image.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Icon } from '@core/enums/icon';
import { ButtonType } from '@core/enums/button-type';
import { getAllValues, getKey } from '@core/utils/enum.util';
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
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';
import { ArticleService } from '@shared/services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gothings-article-form',
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
  protected readonly ButtonType = ButtonType;
  protected readonly Icon = Icon;
  @ViewChild(GalleryComponent) gallery!: GalleryComponent;
  categories: string[];
  genders: string[];
  states: string[];
  errorMessage: string;
  private readonly imageService: ImageService;
  @Input() articleForm: ArticleFormModel;
  @Output() actionButton: EventEmitter<ArticleRequestDto>;

  protected readonly router: Router;
  protected readonly articleService: ArticleService;
  protected formGroup: FormGroup;
  protected withGender: boolean;

  constructor() {
    this.imageService = inject(ImageService);
    this.categories = getAllValues(Category);
    this.states = getAllValues(State);
    this.genders = getAllValues(Gender);
    this.articleForm = new ArticleFormModel();
    this.formGroup = new FormGroup({});
    this.withGender = false;
    this.errorMessage = '';
    this.actionButton = new EventEmitter<ArticleRequestDto>();
    this.articleService = inject(ArticleService);
    this.router = inject(Router);
  }

  ngAfterViewInit() {
    this.formGroup.get('category')?.valueChanges.subscribe(category => {
      this.withGender = new CategoryService().isWithGender(category.select);
    });
  }

  protected getArticleRequestDto() {
    const articleRequestDto: ArticleRequestDto = {
      id: this.articleForm.id,
      title: this.getInputValue('title'),
      description: this.getInputValue('description'),
      category: getKey(
        Category,
        this.getSelectedValue('category')
      ) as CategoryType,
      state: getKey(State, this.getSelectedValue('state')) as StateType,
      images: this.articleForm.images,
    };

    if (this.withGender) {
      articleRequestDto.gender = getKey(
        Gender,
        this.getSelectedValue('gender')
      ) as GenderType;
    }

    return articleRequestDto;
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

  onActionButton() {
    this.actionButton.emit(this.getArticleRequestDto());
  }
}
