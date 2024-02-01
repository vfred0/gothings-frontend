import { Category } from '@core/types/category.type';
import { State } from '@core/types/state.type';
import { Gender } from '@core/types/gender.type';
import { UserDto } from '@core/dtos/user.dto';

export interface ArticleResponseDto {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: Category;
  state: State;
  gender: Gender;
  user: UserDto;
  images: string[];
  likes: number;
  dislikes: number;
}

