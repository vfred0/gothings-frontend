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
import { GalleryComponent } from '@shared/components/gallery/gallery.component';
import { CategoryService } from '@shared/services/category/category.service';
import { ImageService } from '@shared/services/image.service';
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';
import { ArticleService } from '@shared/services/article.service';
import { Router } from '@angular/router';
import { toDto } from '@core/utils/form.util';
import { Gender } from '@core/enums/gender';
import { Gender as GenderType } from '@core/types/gender.type';
import { Category } from '@core/enums/category';
import { Category as CategoryType } from '@core/types/category.type';
import { State } from '@core/enums/state';
import { State as StateType } from '@core/types/state.type';
import { NULL_ARTICLE_FORM } from '@core/models/article';

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
  @ViewChild(GalleryComponent) gallery!: GalleryComponent;
  @Input() articleForm: ArticleRequestDto = NULL_ARTICLE_FORM;
  @Output() save: EventEmitter<ArticleRequestDto>;
  @Input() isWithGender!: boolean;

  public errorMessage!: string;
  protected readonly Validators = Validators;
  protected readonly ButtonType = ButtonType;
  protected readonly Icon = Icon;
  protected readonly getAllValues = getAllValues;
  protected readonly Category = Category;
  protected readonly Gender = Gender;
  protected readonly State = State;
  protected formGroup: FormGroup;
  protected readonly router: Router = inject(Router);
  protected readonly articleService: ArticleService;
  private readonly imageService: ImageService;

  constructor() {
    this.articleService = inject(ArticleService);
    this.imageService = inject(ImageService);
    this.save = new EventEmitter<ArticleRequestDto>();
    this.formGroup = new FormGroup({});
  }

  ngAfterViewInit() {
    this.formGroup.get('category')?.valueChanges.subscribe(category => {
      this.isWithGender = new CategoryService().isWithGender(category.select);
    });
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

  isInvalid(value: string) {
    return (
      this.formGroup.get(value)?.touched && this.formGroup.get(value)?.invalid
    );
  }

  onSubmit() {
    this.save.emit(this.getArticleRequestDto());
  }

  containsImages() {
    return false;
  }

  protected getArticleRequestDto() {
    const articleRequestDto: ArticleRequestDto = toDto<ArticleRequestDto>(
      this.formGroup.value
    );
    articleRequestDto.images = this.articleForm.images;
    articleRequestDto.id = this.articleForm.id;
    if (!this.isWithGender) {
      delete articleRequestDto.gender;
    } else {
      articleRequestDto.gender = getKey(
        Gender,
        articleRequestDto.gender as Gender
      ) as GenderType;
    }

    articleRequestDto.category = getKey(
      Category,
      articleRequestDto.category as Category
    ) as CategoryType;
    articleRequestDto.state = getKey(
      State,
      articleRequestDto.state as State
    ) as StateType;

    return articleRequestDto;
  }
}
