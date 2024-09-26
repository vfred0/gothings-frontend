import { Category } from '@core/types/category.type';
import { Category as CE } from '@core/enums/category';
import { State } from '@core/types/state.type';
import { State as S } from '@core/enums/state';
import { Gender } from '@core/types/gender.type';
import { Gender as G } from '@core/enums/gender';

export interface ArticleRequestDto {
  id?: string;
  title: string;
  description: string;
  category: Category | CE;
  state: State | S;
  gender?: Gender | G;
  images: string[];
}
