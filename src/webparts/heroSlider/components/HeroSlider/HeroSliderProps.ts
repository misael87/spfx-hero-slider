import { DataProvider } from '../../models/DataProvider';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface HeroSliderProps {
  hideControls: boolean;
  hideNavigation: boolean;
  slidesLimit: number;
  dataProvider: DataProvider;
  context: WebPartContext;
}
