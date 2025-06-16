import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/cup.glb');
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return <primitive object={scene} ref={group} />;
}

export default function PlateModel() {
  return (
    <Canvas
      camera={{ position: [.05, 5, 0], fov: 8 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[.05, 0, -3]} angle={0.3} penumbra={1} />
      <pointLight position={[3, -2, 0]} />
      <Model />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}