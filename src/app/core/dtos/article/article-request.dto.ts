import { Category } from '@core/types/category.type';
import { State } from '@core/types/state.type';


export interface ArticleRequestDto {
  title: string;
  description: string;
  category: Category;
  state: State;
  images: string[];
}