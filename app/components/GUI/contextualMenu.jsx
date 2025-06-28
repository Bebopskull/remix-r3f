import { useState, useRef, useEffect } from 'react';



// Lower Left Navigation List Component
// const ContextualMenu = ({ items, activeSection=null, onItemClick=null, className = "" }) => {
//   if (!items || items.length === 0) return null;

  
  
//   return (
//     <div className={`NavSecciones fixed bottom-6 left-6 z-40 ${className}`}>
//       <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-2xl min-w-64">
//         {/* List Items */}        
//         <div className="max-h-96 overflow-y-auto">
//           {items.map((item, index) => (
//             <button
//               key={index}
//               onClick={() => onItemClick(item.path, item.title)}
//               className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0 text-sm font-light"
//             >
//               {item.title}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


// v2 refactored by claude 3.5 sonnet
// Enhanced Contextual Menu Component with Nested Support
const ContextualMenu = ({
  items,
  activeSection,
  onItemClick,
  onSubItemClick,
  expandedItems = [],
  onItemExpand,
  className = ""
}) => {
  if (!items || items.length === 0) return null;

  const handleItemClick = (item) => {
    // If item has sub-projects, expand/collapse it
    if (item.LUVProjects && item.LUVProjects.length > 0) {
      onItemExpand(item.id || item.title);
    } else {
      // Regular navigation
      onItemClick(item.path, item.title);
    }
  };

  return (
    <div className={`NavegadorAbs flex bottom-6 left-6 z-40 ${className}`}>
      <div className="bg-black/30 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden shadow-2xl min-w-64">
        {/* Section Header */}
        {/* <div className="px-4 py-3 bg-white/5 border-b border-white/10">
          <h3 className="text-white text-sm font-medium capitalize tracking-wide">
            {activeSection}
          </h3>
        </div> */}

        {/* List Items */}
        <div className="NavSecciones max-h-96 overflow-y-auto">
          
          {items.map((item, index) => {
            const hasSubItems = item.LUVProjects && item.LUVProjects.length > 0;
            const isExpanded = expandedItems.includes(item.id || item.title);

            return (
              <div key={index}>
                {/* Main Item */}
                <button
                  onClick={() => handleItemClick(item)}
                  className="li block w-full text-left px-4 py-3 text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/5 text-sm font-light "
                >
                  <span>{item.title}</span>
                  {hasSubItems && (
                    <span className={`text-xs transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}>
                      ▶
                    </span>
                  )}
                </button>

                {/* Sub Items (LUV Projects) */}
                {hasSubItems && isExpanded && (
                  <div className=" bg-white/5">
                    {item.LUVProjects.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => onSubItemClick(subItem.path, subItem.title)}
                        className="li block w-full text-left px-8 py-2 text-white/80 hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0 text-xs font-light"
                      >
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContextualMenu;