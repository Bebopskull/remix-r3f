import React from 'react';
// import '../../src/styles/webgl.css'
// import '../../src/styles/glsl.css'
// import '../../src/styles/estilocontinuo.css'
// import '../../src/styles/nikaiCSS.css'
import NavBar from './NavBar';

const Header: React.FC = () => (
  <div>
    <header className="Banner" id="Banner">
      <NavBar />
      <div className="caseLogo" id="caselogo">
        {/* <img src="./media/imagenes/logo/0.5x/Asset 16@0.5x.png" height="100%" width="100%" /> */}
        <img className="logo" id="logo" src="public/media/imagenes/Logo/NIKAI_logo_white_light.svg" 
        height="50%" width="50%" alt="NIKAI Logo" />
      </div>
    </header>
    <div className="aviso" id="avisoDeOrientacion">
      <img className="turn" src="./media/imagenes/turn/0.5x/Asset 23@0.5x.png" alt="Turn device" />
    </div>
  </div>
);

export default Header;