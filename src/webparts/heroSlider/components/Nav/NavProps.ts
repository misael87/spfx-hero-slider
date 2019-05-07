export interface NavProps {
  navItems: string[];
  activeIndex: number;
  onItemSelected(index: number): void;
}
