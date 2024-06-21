import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

const RoomModel = ({ modelPath }: { modelPath: string }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
};

const RoomDetail3D: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RoomModel modelPath={modelPath} />
      <OrbitControls />
    </Canvas>
  );
};

export default RoomDetail3D;
