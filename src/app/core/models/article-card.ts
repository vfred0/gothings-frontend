import { Category } from '@core/enums/category';
import { Gender } from '@core/enums/gender';
import { State } from '@core/enums/state';
import { ArticleResponseDto } from '@core/dtos/article/article-response.dto';
import { getValue } from '@core/utils/enum.util';
import { UserDto } from '@core/dtos/user.dto';
import { ParseDate } from '@core/utils/parse-date';
import { ArticleRequestDto } from '@core/dtos/article/article-request.dto';

export class ArticleCard {
  id: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  gender: Gender;
  state: State;
  likes: number;
  dislikes: number;
  images: string[];
  user: UserDto;

  constructor(article: ArticleResponseDto) {
    this.id = article.id;
    this.title = article.title;
    this.description = article.description;
    this.date = ParseDate.toRelativeTime(article.date);
    this.category = getValue(
      Category,
      article.category as Category
    ) as Category;
    this.gender = Gender.Unisex;
    if (article.gender !== null) {
      this.gender = getValue(Gender, article.gender as Gender) as Gender;
    }
    this.state = getValue(State, article.state as State) as State;
    this.likes = article.likes;
    this.dislikes = article.dislikes;
    this.images = article.images;
    this.user = article.user;
  }

  toArticleRequestDto(): ArticleRequestDto {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      state: this.state,
      images: this.images,
      gender: this.gender,
    };
  }
}
