'use client';

import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { MagnifyingGlassIcon, GlobeAltIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { signOut } from 'next-auth/react';
import NavbarMenuItem from './NavbarMenuItem';
import { ProductsToolbar, ShirtToolbar, NewsToolbar } from './navbar-toolbars';

const Navbar: FC = () => {

  const toolbarComponents = [ShirtToolbar, ProductsToolbar, NewsToolbar];

  return (
    <nav className="hidden md:flex h-30 px-14 md:pl-1 md:pr-2 lg:px-14">
      {toolbarComponents.map((toolbarComponent, index: number) => (
        <NavbarMenuItem ComponentToRender={toolbarComponent} index={index} key={index} />
      ))}
    </nav >
  );
};

export default Navbar;
