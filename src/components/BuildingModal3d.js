import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { GLTFLoader } from "three-stdlib";
import { GUI } from "dat.gui";
import { angleRadians } from "../utils/angle"; // make sure this file exists
import { TextGeometry } from "three-stdlib";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";







const EmpireStateBuilding3d = () => {
  const gui = new GUI();
  const meshRef = useRef(null);

  // Load GLB model
  const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/EmpireState.glb");


  const font = new FontLoader().parse(helvetiker);

  const textOptions = {
    font,
    size: 0.8,
    height: 0.05,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.005,
    bevelSegments: 5,
  };

  const textGeometry = new TextGeometry("Empire State Of Mind", textOptions);
  textGeometry.center(); // optional: center the text


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

      <mesh geometry={textGeometry} position={[-0.5, 3.9, -1]}>
        <meshStandardMaterial color="#FFD700" />
      </mesh>


      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[-3, 5, 4]} intensity={1} castShadow />
    </>
  );
};

export default EmpireStateBuilding3d;
