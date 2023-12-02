import React, { FC, ReactNode, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useShirtStore } from '@/app/store/zustandStore';
import { Group } from 'three';

const CameraRig = ({ children }: { children: ReactNode }) => {
  const group = useRef<Group | null>(null!)
  const { intro } = useShirtStore();

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    let targetPosition = [-0.4, 0, 2];
    if (intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } 
    else {
      if (isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }

    easing.damp3(state.camera.position, targetPosition as [number, number, number], 0.25, delta)

    if (!group.current) 
      return;
    
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    )
  })


  return <group ref={group}>{children}</group>
}

export default CameraRig;
