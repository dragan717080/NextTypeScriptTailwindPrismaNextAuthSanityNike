'use client';
import { FC, useState } from 'react';

const NavbarToolbar: FC = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative z-40">
      <div
        className="parent-container bg-gray-200 p-4 rounded-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover over me!
        {isHovered && (
          <div className="toolbar absolute bg-white border p-2 shadow-md">
            <button className="mr-2">Option 1</button>
            <button className="mr-2">Option 2</button>
            <button>Option 3</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarToolbar;
