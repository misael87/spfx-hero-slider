import { Slide } from "../../models/Slide";
import { ComponentStatus } from "../../models/ComponentStatus";

export interface HeroSliderState {
 slides: Slide[];
 currentIndex: number;
 componentStatus: ComponentStatus;
}
