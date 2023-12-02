'use client';

import React from 'react';
import { easing } from 'maath';
import { useShirtStore }  from '@/app/store/zustandStore';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import { v4 as uuidv4 } from 'uuid';
import { GLTFRes } from '@/app/interfaces/types';
import { Texture } from 'three';

const Shirt = () => {
  const { nodes, materials } = useGLTF('/assets/images/shirt_baked.glb') as GLTFRes;
  const { intro, color, isLogoTexture, isFullTexture, logoDecal, fullDecal } = useShirtStore();

  const logoTexture = useTexture(logoDecal);
  const fullTexture = useTexture(fullDecal);
  const uuid = uuidv4();

  useFrame((state, delta) => easing.dampC(materials.lambert1.color, color, 0.25, delta));

  return (
    <group key={uuid}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
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
    </group>
  )
}

export default Shirt;
