import { AfterViewInit, Component, inject } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getAllValues, getKey } from '@core/utils/enum.util';
import { Category } from '@core/enums/category';
import { Category as CategoryType } from '@core/types/category.type';
import { State } from '@core/enums/state';
import { State as StateType } from '@core/types/state.type';
import { FilterArticleDto } from '@core/dtos/article/filter-article.dto';
import { HomeService } from '@shared/services/home.service';
import { ArticleCardComponent } from '@shared/components/article-card/article-card.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { Icon } from '@core/enums/icon';
import { ButtonType } from '@core/enums/button-type';

@Component({
  selector: 'gothings-home',
  standalone: true,
  imports: [
    HeaderComponent,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
    ArticleCardComponent,
    ButtonComponent,
  ],
  templateUrl: './home.page.html',
})
export default class HomePage implements AfterViewInit {
  formGroup: FormGroup;
  categories: string[];
  states: string[];
  category: Category;
  state: State;
  readonly homeService: HomeService;
  private readonly filterArticleDto: FilterArticleDto;
  protected readonly Icon = Icon;
  protected readonly ButtonType = ButtonType;

  constructor() {
    this.categories = getAllValues(Category);
    this.states = getAllValues(State);
    this.category = Category.TextBooksEducationalMaterial;
    this.state = State.New;
    this.formGroup = new FormGroup({});
    this.filterArticleDto = {} as FilterArticleDto;
    this.filterArticleDto.category = getKey(
      Category,
      this.category
    ) as CategoryType;
    this.filterArticleDto.state = getKey(State, this.state) as StateType;
    this.filterArticleDto.title = '';
    this.homeService = inject(HomeService);
  }

  ngAfterViewInit() {
    this.formGroup.valueChanges.subscribe(() => {
      this.filterArticleDto.category = getKey(
        Category,
        this.getSelectedValue('category')
      ) as CategoryType;
      this.filterArticleDto.state = getKey(
        State,
        this.getSelectedValue('state')
      ) as StateType;
      this.filterArticleDto.title = this.getInputValue('title');
      this.homeService.search(this.filterArticleDto);
    });
  }

  private getInputValue(value: string) {
    return this.formGroup.get(value)?.value.inputValue;
  }

  private getSelectedValue(value: string) {
    return this.formGroup.get(value)?.value.select;
  }

  getResultLabel() {
    const totalArticlesCards = this.homeService.totalArticlesCards;
    if (totalArticlesCards == 0) {
      return 'No existen artículos';
    }
    if (totalArticlesCards == 1) {
      return '1 artículo';
    }
    return `${totalArticlesCards} artículos`;
  }
}
