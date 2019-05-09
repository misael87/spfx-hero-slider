import { DataProvider } from '../../models/DataProvider';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface HeroSliderProps {
  hideControls: boolean;
  hideNavigation: boolean;
  slidesLimit: number;
  contentTypeName: string;
  dataProvider: DataProvider;
  context: WebPartContext;
}
