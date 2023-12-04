'use client';

import { FC, useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Loader, useGLTF, useTexture, Decal, Center, Clone } from '@react-three/drei';
import { OrbitControls, Preload } from '@react-three/drei/core';
import { GLTFRes } from '@/app/interfaces/types';
import { Texture, Mesh } from 'three';
import { useShirtStore } from '@/app/store/zustandStore';
import { easing } from 'maath';
import { CameraRig } from './shirt';
import Link from 'next/link';
import { cloneDeep } from 'lodash';

const Shirt: FC = () => {
  const { nodes, materials } = useGLTF('/assets/images/shirt_baked.glb') as GLTFRes;
  const shirtTwo = useGLTF('/assets/images/shirt_baked.glb') as GLTFRes;
  const { intro, color, isLogoTexture, isFullTexture, logoDecal, fullDecal } = useShirtStore();

  const logoTexture = useTexture(logoDecal);
  const fullTexture = useTexture(fullDecal);

  const shirtOneRef = useRef<Mesh>(null!);
  const shirtTwoRef = useRef<Mesh>(null!);

  const shirtTwoMaterial = cloneDeep(materials.lambert1);
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, color, 0.25, delta));
  useFrame((state, delta) => easing.dampC(shirtTwoMaterial.color, '#5a4081', 0.25, delta));

  const scaleFactor = 2.3;

  const getPos = (): [number, number] => {
    if (typeof (window) === 'undefined') {
      return [0.2, 0.9];
    }

    // Viewport module from three is buggy, window approach is better
    return window.innerWidth > 1280 ? [0.2, 0.15] : window.innerWidth > 900 ? [0.3, 0.45] : window.innerWidth > 600 ? [0.35, 0.7] : [0.46, 1.85];
  }

  // #5a4081
  return (
    <>
      <group scale={scaleFactor} position={[...getPos(), 0]}>
        <mesh
          castShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-roughness={1}
          position={[0, 0, 0]}
          scale={1.2}
          ref={shirtTwoRef}
        >
          {isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture as Texture}
            />
          )}
          {isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture as Texture}
              /* map-anisotropy={16} */
              depthTest={false}
            />
          )}
        </mesh>
        <mesh
          castShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={shirtTwoMaterial}
          material-color={0x5100ff}
          dispose={null}
          position={[0.5, 0, -0.4]}
          scale={1.2}
          ref={shirtTwoRef}
        >
{/*          {isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture as Texture}
            />
          )}
           {isLogoTexture && (
            <Decal
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture as Texture}
              depthTest={false}
            />
          )} */}
        </mesh>
      </group>
    </>
  )
}

const ShirtCanvas: FC = () => {
  return (
    <Canvas
      dpr={[0, 2]}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 1, 1]} />
      <OrbitControls enabled={false} />
      <Suspense fallback={<Html><Loader /></Html>}>
        <CameraRig>
          <Center>
            <Shirt />
          </Center>
        </CameraRig>
      </Suspense>
    </Canvas>
  )
}

export default ShirtCanvas;
