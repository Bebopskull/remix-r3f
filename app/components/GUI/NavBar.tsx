// import '../../src/styles/estilocontinuo.css'
// import '../../src/styles/nikaiCSS.css'

import type { FC, PropsWithChildren } from 'react';

// NavItem component
const NavItem: FC<PropsWithChildren<{ className?: string; id?: string; onClick?: (e: React.MouseEvent) => void }>> = ({ className, id, onClick, children }) => (
  <li className={className} id={id} onClick={onClick}>
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
const NavBar: FC<{ onNavClick?: (e: React.MouseEvent) => void }> = ({ onNavClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    const sectionId = e.currentTarget.id;
    console.log('NavBar clicked:', sectionId);
    if (onNavClick) {
      onNavClick(e);
    }
  };

  return (
    <nav className="navBan" id="navBan">
      <NavList>
        <NavItem className="liBan" id="projects" onClick={handleClick}>
          <a className="libantext">Projects</a>
        </NavItem>
        <p className="slash" id="slash">/</p>
        
        <NavItem className="liBan" id="lab" onClick={handleClick}>
          <a className="libantext">Lab_</a>
        </NavItem>
        <p className="slash" id="slash">/</p>
       
        <NavItem className="liBan" id="about" onClick={handleClick}>
          <a className="libantext">About</a>
        </NavItem>
      </NavList>
    </nav>
  );
};

export default NavBar;
export { NavList, NavItem }; 