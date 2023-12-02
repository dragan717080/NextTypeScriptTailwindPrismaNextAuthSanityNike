import '../globals.css';
import '../styles/animations.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from '@/app/context/ToasterContext';
import AuthContext from '@/app/context/AuthContext';
import { CartProvider, CartModal, Header } from '@/app/(site)/components';

const inter = Inter({ subsets: ['latin'] })

export default function ShirtLayout({ children }: { children: ReactNode }) {

  return (
    <AuthContext>
      <ToasterContext />
      <CartProvider>
        <CartModal />
        {children}
      </CartProvider>
    </AuthContext>
  )
}
