import { Category } from '../enums/Category.ts';
import { State } from '../enums/State.ts';
import { Gender } from '../enums/Gender.ts';

export interface Article {
  id: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  state: State;
  gender: Gender;
  images: string[];
}