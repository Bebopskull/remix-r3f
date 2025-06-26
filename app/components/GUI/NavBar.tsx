// import '../../src/styles/estilocontinuo.css'
// import '../../src/styles/nikaiCSS.css'

import type { FC, PropsWithChildren } from 'react';

// NavItem component
const NavItem: FC<PropsWithChildren<{ className?: string; id?: string }>> = ({ className, id, children }) => (
  <li className={className} id={id}>
    {children}
  </li>
);

// NavList component
const NavList: FC<PropsWithChildren<{}>> = ({ children }) => (
  <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
    {children}
  </ul>
);

// NavBar component
const NavBar: FC = () => (
  <nav className="navBan" id="navBan">
    <NavList>
      <NavItem className="liBan" id="projects">
        <a className="libantext">Projects</a>
      </NavItem>
      <p className="slash" id="slash">/</p>
      {/*
      <NavItem className="liBan" id="lab">
        <a className="libantext">Lab_</a>
      </NavItem>
      <p className="slash" id="slash">/</p>
      */}
      <NavItem className="liBan" id="about">
        <a className="libantext">About</a>
      </NavItem>
    </NavList>
  </nav>
);

export default NavBar;
export { NavList, NavItem }; 