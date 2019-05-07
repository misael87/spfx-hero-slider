import { Slide } from './Slide';

export interface DataProvider {
  getSlides(): Promise<Slide[]>;
}
