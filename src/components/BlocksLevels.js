import React from "react";
import {useLoader} from "@react-three/fiber";
import {TextureLoader} from "three/src/loaders/TextureLoader";
import texture from "../assets/TexturesCurt1.jpg";

const BlocksLevels = (props) => {
  const colorMap = useLoader(TextureLoader, texture);
  return (
    <>
      <mesh position={[props.positionX, props.positionY, props.positionZ]} castShadow>
        <boxGeometry args={[props.geoParamsX, props.geoParamsY, props.geoParamsZ]} />
        <meshStandardMaterial color="#c7a887" />
      </mesh>

      {/* windowBorder */}
      <mesh position={[-0.3, props.windowHeight, 0.85]}>
        <boxGeometry args={[0.38, 0.21, 0.08]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.3, props.windowHeight, 0.85]}>
        <boxGeometry args={[0.38, 0.21, 0.08]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* windowBorder */}

      {/* window */}
      <mesh position={[-0.3, props.windowHeight, 0.8501]}>
        <boxGeometry args={[0.31, 0.15, 0.08]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      <mesh position={[0.3, props.windowHeight, 0.8501]}>
        <boxGeometry args={[0.31, 0.15, 0.08]} />
        <meshStandardMaterial map={colorMap} />
      </mesh>
      {/* window */}
    </>
  );
};

export default BlocksLevels;
