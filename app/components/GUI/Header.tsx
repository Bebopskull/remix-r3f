import React from 'react';
// import '../../src/styles/webgl.css'
// import '../../src/styles/glsl.css'
// import '../../src/styles/estilocontinuo.css'
// import '../../src/styles/nikaiCSS.css'
import NavBar from './NavBar';

const Logo = ({onSectionChange}) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    console.log('Clearing Contextual Menu');
    if (onSectionChange) {
      onSectionChange(null);
    }
  };
 return(
  <div className="caseLogo" id="caselogo" onClick={handleLogoClick}>
  {/* <img src="./media/imagenes/logo/0.5x/Asset 16@0.5x.png" height="100%" width="100%" /> */}
    <img className="logo" id="logo" src="public/media/imagenes/Logo/NIKAI_logo_white_light.svg"
      height="50%" width="50%" alt="NIKAI Logo" />
  </div>
 )
}
const Header = ({ onSectionChange }: { onSectionChange: (sectionId: string) => void }) => {
  const handleNavClick = (e: React.MouseEvent) => {
    const sectionId = e.currentTarget.id; // This gets the return value from NavBar
    console.log('Header received:', sectionId);
    if (onSectionChange) {
      onSectionChange(sectionId);
    }
  };

  return (
    <div>
      <header className="Banner" id="Banner">
        <NavBar onNavClick={handleNavClick}/>
        
        <Logo onSectionChange={onSectionChange}/>
      </header>
      <div className="aviso" id="avisoDeOrientacion">
        <img className="turn" src="./media/imagenes/turn/0.5x/Asset 23@0.5x.png" alt="Turn device" />
      </div>
    </div>
  );
};

export default Header;

export { Logo };