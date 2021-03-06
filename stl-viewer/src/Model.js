import React, { useEffect, useRef } from "react";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader, useThree } from "@react-three/fiber";

export const Model = ({ url }) => {
  const geom = useLoader(STLLoader, url);
  const ref = useRef();
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(ref.current.position);
  });

  return (
    <>
      <mesh ref={ref}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={"orange"} />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};