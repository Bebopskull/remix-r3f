// app/components/GUI/NavBar.tsx - Simple navbar without dropdowns
import type { FC, PropsWithChildren } from 'react';
import { useNavigate, useLocation } from '@remix-run/react';

// NavItem component
const NavItem: FC<PropsWithChildren<{
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent) => void;
}>> = ({ className, id, children, onClick }) => (
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

// Simple NavBar component without dropdowns
const NavBar: FC<{ onNavClick?: (e: React.MouseEvent) => void }> = ({ onNavClick }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    const sectionId = e.currentTarget.id;
    console.log('NavBar clicked:', sectionId);
    if (onNavClick) {
      onNavClick(e);
    }
  };

  // Programmatic navigation handler
  const handleNavigation = (path: string) => {
    console.log(`🔄 Programmatic navigation to: ${path}`);
    navigate(path, {
      replace: false,
      state: {
        programmatic: true,
        timestamp: Date.now()
      }
    });
  };

  // Check if current route is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navBan" id="navBan">
      <NavList>
        {/* Projects */}
        <NavItem
          className={`liBan ${isActive('/projects') ? 'active' : '' }`}
          id="projects"
          onClick={() => {
            handleNavigation('/projects');
            handleClick;
          }}
        >
          <a className="libantext">Projects</a>
        </NavItem>

        <p className="slash" id="slash">/</p>

        {/* Lab */}
        <NavItem
          className={`liBan ${isActive('/lab') ? 'active' : ''}`}
          id="lab"
          onClick={() => {
            handleNavigation('/lab');
            handleClick;
          }}
        >
          <a className="libantext">Lab_</a>
        </NavItem>

        <p className="slash" id="slash">/</p>

        {/* About */}
        <NavItem
          className={`liBan ${isActive('/about') ? 'active' : ''}`}
          id="about"
          onClick={() => {
            handleNavigation('/about');
            handleClick;
          }}
        >
          <a className="libantext">About</a>
        </NavItem>
      </NavList>
    </nav>
  );
};

export default NavBar;
export { NavList, NavItem };



//Old Code/////

// import type { FC, PropsWithChildren } from 'react';

// // NavItem component
// const NavItem: FC<PropsWithChildren<{ className?: string; id?: string; onClick?: (e: React.MouseEvent) => void }>> = ({ className, id, onClick, children }) => (
//   <li className={className} id={id} onClick={onClick}>
//     {children}
//   </li>
// );

// // NavList component
// const NavList: FC<PropsWithChildren<{}>> = ({ children }) => (
//   <ul style={{ display: 'flex', alignItems: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
//     {children}
//   </ul>
// );

// // NavBar component
// const NavBar: FC<{ onNavClick?: (e: React.MouseEvent) => void }> = ({ onNavClick }) => {
//   const handleClick = (e: React.MouseEvent) => {
//     const sectionId = e.currentTarget.id;
//     console.log('NavBar clicked:', sectionId);
//     if (onNavClick) {
//       onNavClick(e);
//     }
//   };

//   return (
//     <nav className="navBan" id="navBan">
//       <NavList>
//         <NavItem className="liBan" id="projects" onClick={handleClick}>
//           <a className="libantext">Projects</a>
//         </NavItem>
//         <p className="slash" id="slash">/</p>
        
//         <NavItem className="liBan" id="lab" onClick={handleClick}>
//           <a className="libantext">Lab_</a>
//         </NavItem>
//         <p className="slash" id="slash">/</p>
       
//         <NavItem className="liBan" id="about" onClick={handleClick}>
//           <a className="libantext">About</a>
//         </NavItem>
//       </NavList>
//     </nav>
//   );
// };

// export default NavBar;
// export { NavList, NavItem }; 