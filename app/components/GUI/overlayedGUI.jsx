import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import contextualMenu from './contextualMenu';
import '../../CSS/estilocontinuo.css'
import '../../CSS/nikaiCSS.css'
import { navigationData } from '../routes/navigationData';


export const OverlayedGUI = () => {
  return (
    <div className="GUI">
      <Header />
      <contextualMenu items={navigationData.projects} activeSection={activeSection} onItemClick={onItemClick} />
    </div>
  );
};