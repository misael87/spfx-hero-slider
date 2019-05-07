import { IDataProvider } from '../../data/IDataProvider';

export interface IHeroSliderProps {
  hideControls: boolean;
  hideNavigation: boolean;
  slidesLimit: number;
  dataProvider: IDataProvider;
}
