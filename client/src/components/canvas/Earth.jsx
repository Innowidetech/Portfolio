import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Earth component to load the 3D model
const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");  // Load the GLTF file
  const earthRef = useRef(); // Create a reference to the Earth mesh

  // Create dynamic rotation for the Earth
  useEffect(() => {
    const interval = setInterval(() => {
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.01; // Change this to adjust speed
      }
    }, 16); // 16 ms for roughly 60 FPS

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <primitive
      object={earth.scene}
      ref={earthRef}
      scale={2.5}
      position-y={0}
      rotation-y={0}  // Start rotation at 0
    />
  );
};

// Main EarthCanvas component
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],  // Set camera position
      }}
    >
      <Suspense fallback={<CanvasLoader />}>  {/* Loader for the model */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all /> {/* Preload all assets */}
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
