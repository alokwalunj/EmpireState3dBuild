import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { GUI } from "dat.gui";
import { angleRadians } from "../utils/angle"; // make sure this file exists

const EmpireStateBuilding3d = () => {
  const gui = new GUI();
  const meshRef = useRef(null);

  // Load GLB model
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/EmpireState.glb");

  // useEffect(() => {
  //   if (meshRef.current) {
  //     gui.add(meshRef.current.scale, "x", 0, 2).name("Scale X");
  //     gui.add(meshRef.current.scale, "y", 0, 2).name("Scale Y");
  //     gui.add(meshRef.current.scale, "z", 0, 2).name("Scale Z");
  //   }

  //   return () => gui.destroy();
  // }, []);

  useEffect(() => {
    if (meshRef.current) {
      // Add GUI scale controls
      gui.add(meshRef.current.scale, "x", 0, 2).name("Scale X");
      gui.add(meshRef.current.scale, "y", 0, 2).name("Scale Y");
      gui.add(meshRef.current.scale, "z", 0, 2).name("Scale Z");

      // Traverse through all meshes inside the GLB scene
      meshRef.current.traverse((child) => {
        if (child.isMesh) {
          // Example: change all mesh colors to gold
          child.material.color.set("#FFD700"); // Gold color
          child.material.needsUpdate = true;
        }
      });
    }

    return () => gui.destroy();
  }, []);


  return (
    <>
      <PerspectiveCamera position={[-3, 6, 7]} makeDefault />
      <OrbitControls enableZoom maxPolarAngle={angleRadians(85)} minPolarAngle={angleRadians(60)} />

      {/* Render the GLB model */}
      <primitive object={gltf.scene} ref={meshRef} position={[-7.2, 0, -1]} scale={[0.01, 0.01, 0.01]} />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[-3, 5, 4]} intensity={1} castShadow />
    </>
  );
};

export default EmpireStateBuilding3d;
