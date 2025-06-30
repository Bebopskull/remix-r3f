import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import ContextualMenu from './contextualMenu.tsx';
// import '../../src/styles/estilocontinuo.css'
// import '../../src/styles/nikaiCSS.css'
import { currentNavigationData } from '../../src/navigationData.js';
import { Footer } from './footer.tsx';



export const OverlayedGUI = () => {

  const navigationData = currentNavigationData;

  const [activeSection, setActiveSection] = useState(null);

  const handleNavClick = (e) => {
    setActiveSection(e.currentTarget.id);
  }

  //handleSectionChange
  const handleSectionChange = (sectionId) => {
    console.log('handleSectionChange', sectionId);
    setActiveSection(sectionId);
  }

  return (
    <div className="GUI">
      <Header items={navigationData[activeSection]} onSectionChange={handleSectionChange} />
      <ContextualMenu items={navigationData[activeSection]} activeSection={activeSection} />
      <Footer />
      {/* <div className="footer">
        <div className="moto">
          <p> footer</p>
        </div>
      </div> */}
    </div>
  );
};