import { Slide } from './Slide';

export interface DataProvider {
  getSlides(contentTypeName?: string): Promise<Slide[]>;
}
