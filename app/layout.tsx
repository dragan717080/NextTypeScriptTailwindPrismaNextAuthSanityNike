import './globals.css';
import './styles/animations.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import { CartProvider, CartModal } from './(site)/components';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DraganWebsites',
  description: 'App built with Next.js, TypeScript, Tailwind, MongoDB, Sanity, NextAuth, Zustand and Prisma',
}

export default function RootLayout({ children }: { children: ReactNode }) {

  // For default font: <body className={inter.className}>
  // If need to use Redux, move components after ToasterContext into page.tsx

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Asap&display=swap" rel="stylesheet" />
      </head>

      <body>
        <div className="col-v min-h-screen">
          <AuthContext>
            <ToasterContext />
            <CartProvider>
              {children}
            </CartProvider>
          </AuthContext>
        </div>
      </body>
    </html>
  )
}
