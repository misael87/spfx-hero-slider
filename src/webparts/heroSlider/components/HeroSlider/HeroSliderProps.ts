import { DataProvider } from '../../models/DataProvider';

export interface HeroSliderProps {
  hideControls: boolean;
  hideNavigation: boolean;
  slidesLimit: number;
  dataProvider: DataProvider;
}
