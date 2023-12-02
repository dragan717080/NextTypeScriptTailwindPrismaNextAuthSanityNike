import React, { FC, useState, useRef } from 'react';
import ArrowIcon from './svgs/ArrowIcon';
import NavbarPortal from './NavbarPortal';
import { useNavbarPortalStore } from '@/app/store/zustandStore';
import Link from 'next/link';

interface NavbarMenuItemProps {
  ComponentToRender: React.ComponentType;
  index: number;
}

const NavbarMenuItem: FC<NavbarMenuItemProps> = ({ ComponentToRender, index }) => {
  const { isNavbarPortalOpen, setIsNavbarPortalOpen } = useNavbarPortalStore();

  // Local state to manage the portal for this specific toolbar
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const navbarMenuItemRef = useRef<HTMLDivElement | null>(null);

  const getNavbarPortalStyling = () => {
    if (!navbarMenuItemRef.current)
      return;
    const rect = navbarMenuItemRef.current?.getBoundingClientRect();
    return rect.left + window.scrollX;
  }

  const navbarPortalStyling = getNavbarPortalStyling();
  if (!ComponentToRender.displayName)
    ComponentToRender.displayName = 'Add display name to this component';

  const content = (
  <div className="group row-v space-x-0.5 hover:text-primary">
    <h2 className='semibold'>{ComponentToRender.displayName.split("Toolbar")[0]}</h2>
    <div className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-180 group-hover:text-primary">
      {/* <ArrowIcon /> */}
    </div>
  </div>
);

  return (
    <div ref={navbarMenuItemRef} className="relative">
      <div
        className={`parent-container p-4 md:px-1.5 xl:px-4 ${ComponentToRender.displayName === 'ShirtToolbar' ? 'pointer' : ''}`}
        onMouseEnter={() => {
          setIsHovered(true);
          setIsNavbarPortalOpen(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsNavbarPortalOpen(false);
        }}
      >
        {ComponentToRender.displayName === 'ShirtToolbar'
        ? <Link href='/shirt'>{ content }</Link>
        : <>{ content }</> }
        <NavbarPortal>
          {isHovered && isNavbarPortalOpen && (
            <div className='navbar-portal-content' style={{ left: `${navbarPortalStyling}px` }}>
              <ComponentToRender />
            </div>
          )}
        </NavbarPortal>
      </div>
    </div>
  );
};

export default NavbarMenuItem;
