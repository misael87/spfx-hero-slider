import { Slide } from "../../models/Slide";

export interface NavProps {
    navItems: Slide[];
    activeIndex: number;
    onItemSelected(index: number): void;
}