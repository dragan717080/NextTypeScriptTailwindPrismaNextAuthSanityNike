'use client';

import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';

import { CanvasModel, Customizer } from '../(site)/components/shirt';
import '../shirt.css';

const Shirt = () => {
  return (
    <main className="app transition-all ease-in">
      <CanvasModel />
      <Customizer />
    </main>
  )
}

export default Shirt;
