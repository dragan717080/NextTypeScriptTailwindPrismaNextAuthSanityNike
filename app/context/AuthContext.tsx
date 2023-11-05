"use client";
import { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";

export interface AuthContextProps {
  children: ReactNode;
}

export default function AuthContext({ 
  children
}: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
