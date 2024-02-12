import { Category } from '@core/types/category.type';
import { State } from '@core/types/state.type';

export interface FilterArticleDto {
  title: string;
  state: State;
  category: Category;
}
