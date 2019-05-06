export interface INavItem {
  title: string;
}

export interface INavProps {
  navItems: INavItem[];
  activeIndex: number;
  onItemSelected(index: number): void;
}
