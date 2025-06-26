import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import contextualMenu from './contextualMenu';
import '../../src/styles/estilocontinuo.css'
import '../../src/styles/nikaiCSS.css'
import { navigationData } from '../../src/routes/navigationData';


export const OverlayedGUI = () => {
  return (
    <div className="GUI">
      <Header />
      <contextualMenu items={navigationData.projects} />
    </div>
  );
};