import React from 'react'
import { useShirtStore }  from '@/app/store/zustandStore';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const { color } = useShirtStore();

  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img 
        src={tab.icon.src}
        alt={tab.name}
        className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
      />
    </div>
  )
}

export default Tab;
