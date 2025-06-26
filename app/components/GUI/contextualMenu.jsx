import { useState, useRef, useEffect } from 'react';

// import '../../src/styles/estilocontinuo.css'
// import '../../src/styles/nikaiCSS.css'

// Lower Left Navigation List Component
const contextualMenu = ({ items, activeSection=null, onItemClick=null, className = "" }) => {
  if (!items || items.length === 0) return null;

  
  
  return (
    <div className={`NavSecciones fixed bottom-6 left-6 z-40 ${className}`}>
      <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-2xl min-w-64">
        {/* List Items */}        
        <div className="max-h-96 overflow-y-auto">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onItemClick(item.path, item.title)}
              className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0 text-sm font-light"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default contextualMenu;