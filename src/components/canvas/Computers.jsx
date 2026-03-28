import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  const Computers = () => {
    const computer = useGLTF("./desktop_pc/scene.gltf");

    return (
      <mesh>
        <hemisphereLight intensity={0.15} groundColor="black" />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight intensity={1} />
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.4 : 0.75} // 0.75 / 4 ≈ 0.18
          position={isMobile ? [0, -3, -0.5] : [0.25, -2.25, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      </mesh>
    );
  };

  return (
    // !isMobile && ( // Hide on mobile screens
    <Canvas
    style={{ width: "100%", height: "100%", touchAction: "pan-y" }}
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={
        isMobile
          ? { position: [10, 2, 5], fov: 40 }
          : { position: [20, 3, 5], fov: 25 }
      }
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense>
        <OrbitControls
          // enableRotate={!isMobile}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>
      <Preload all />
    </Canvas>
  );
  // );
};

export default ComputersCanvas;
