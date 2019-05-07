import ISlideProps from '../components/Slide/ISlideProps';

export interface IDataProvider {
  getSlides(): Promise<ISlideProps[]>;
}
