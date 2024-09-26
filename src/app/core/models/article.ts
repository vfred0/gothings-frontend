import { Category } from '@core/enums/category';
import { State } from '@core/enums/state';
import { Gender } from '@core/enums/gender';

export const NULL_ARTICLE_FORM = {
  title: '',
  description: '',
  date: new Date(),
  category: Category.TextBooksEducationalMaterial,
  state: State.New,
  gender: Gender.Unisex,
  images: [],
};
