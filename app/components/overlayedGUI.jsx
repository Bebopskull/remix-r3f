import { useState, useRef, useEffect } from 'react';
import contextualMenu from './contextualMenu';
import '../CSS/estilocontinuo.css'
import '../CSS/nikaiCSS.css'

export const overlayedGUI = () => {
  return (
    <div className="NavegadorAbs">
      <contextualMenu items={items} activeSection={activeSection} onItemClick={onItemClick} />
    </div>
  );
};