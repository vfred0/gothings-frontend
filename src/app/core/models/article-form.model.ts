import { Category } from '@core/enums/category';
import { State } from '@core/enums/state';
import { Gender } from '@core/enums/gender';

export class ArticleFormModel {
  id = '';
  title = '';
  description = '';
  date = new Date();
  category = Category.TextBooksEducationalMaterial;
  state = State.New;
  gender = Gender.Unisex;
  images: string[] = [];
  likes = 0;
  dislikes = 0;
}
