import { Category } from '../enums/Category.ts';
import { State } from '../enums/State.ts';
import { Gender } from '../enums/Gender.ts';

export type Article = {
  id: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  state: State;
  gender: Gender;
  images: string[];
}

export type ArticleRequestDto = Omit<Article, 'id'>
export type ArticleResponseDto = Article