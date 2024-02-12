import { AfterViewInit, Component, inject } from '@angular/core';
import { HeaderComponent } from '@shared/components/header/header.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { getLayout } from '@core/utils/app-route.util';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getAllValues, getKey } from '@core/utils/enum.util';
import { Category } from '@core/enums/category';
import { Category as CategoryType } from '@core/types/category.type';
import { State } from '@core/enums/state';
import { State as StateType } from '@core/types/state.type';
import { FilterArticleDto } from '@core/dtos/article/filter-article.dto';
import { HomeService } from '@shared/services/home.service';
import { ArticleCardComponent } from '@shared/components/article-card/article-card.component';

@Component({
  selector: 'gothings-home',
  standalone: true,
  imports: [
    HeaderComponent,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
    ArticleCardComponent,
  ],
  templateUrl: './home.page.html',
})
export default class HomePage implements AfterViewInit {
  protected readonly getLayout = getLayout;
  formGroup: FormGroup;
  categories: string[];
  states: string[];
  category: Category;
  state: State;
  readonly homeService: HomeService;
  private readonly filterArticleDto: FilterArticleDto;

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
}
