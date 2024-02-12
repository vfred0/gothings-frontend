import { Category } from '@core/types/category.type';
import { State } from '@core/types/state.type';
import { Gender } from '@core/types/gender.type';

export interface ArticleRequestDto {
  title: string;
  description: string;
  category: Category;
  state: State;
  gender?: Gender;
  images: string[];
}
