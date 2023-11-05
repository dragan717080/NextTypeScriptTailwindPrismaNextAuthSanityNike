'use client';

import { FC, useRef, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import RenderProp from '@/app/interfaces/RenderProp';

const NavbarPortal: FC<RenderProp> = ({ children }) => {

  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    ref.current = document.getElementById('navbar-portal-root');
    setMounted(true);
  }, []);

  return (mounted && ref.current) ? 
    createPortal(<div className='rounded-lg bg-white text-red-50 z-50'>{children}</div>, ref.current) : 
    null
};

export default NavbarPortal;
