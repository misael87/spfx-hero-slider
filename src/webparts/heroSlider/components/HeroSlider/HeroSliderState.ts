import { ComponentStatus } from '../../models/ComponentStatus';
import { Slide } from '../../models/Slide';

export interface HeroSliderState {
  slides: Slide[];
  currentIndex: number;
  componentStatus: ComponentStatus;
}
