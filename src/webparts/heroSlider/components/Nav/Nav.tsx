import * as React from 'react';
import { NavProps } from './NavProps';
import styles from './Nav.module.scss';

const Nav: React.StatelessComponent<NavProps> = ({
  navItems,
  onItemSelected,
  activeIndex,
}) => {
  return (
    <nav className={styles.nav}>
      {navItems.map((item, index) => (
        <button
          className={[
            styles.navItem,
            index === activeIndex ? styles.active : '',
          ].join(' ')}
          key={item.id}
          type="button"
          onClick={() => onItemSelected(index)}
        >
          {item.title}
        </button>
      ))}
    </nav>
  );
};

Nav.defaultProps = {
  navItems: [],
};

export default Nav;
