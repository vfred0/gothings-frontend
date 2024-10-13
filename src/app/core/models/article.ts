import { Category } from '../enums/category.ts';
import { State } from '../enums/state.ts';
import { Gender } from '../enums/gender.ts';

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