import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { useRef, Suspense } from "react";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";

const CameraControls = () => {
  const controlsRef = useRef();
  const isInteracting = useRef(false);

  useFrame(() => {
    if (!controlsRef.current || isInteracting.current) return;
    
    const current = {
      azimuth: controlsRef.current.getAzimuthalAngle(),
      polar: controlsRef.current.getPolarAngle()
    };
    
    // Snap back to center smoothly
    controlsRef.current.setAzimuthalAngle(current.azimuth * 0.95);
    controlsRef.current.setPolarAngle(current.polar + (Math.PI / 2 - current.polar) * 0.05);
    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      maxDistance={20}
      minDistance={5}
      minPolarAngle={Math.PI / 5}
      maxPolarAngle={Math.PI / 2}
      onStart={() => isInteracting.current = true}
      onEnd={() => setTimeout(() => isInteracting.current = false, 100)}
    />
  );
};

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "max-width: 1024px" });
  const isMobile = useMediaQuery({ query: "max-width: 768px" });
  
  return (
    <Canvas camera={{ position: [0, 0, 13], fov: 40 }}>
      <CameraControls />
      <Particles count={100} />
      <Suspense fallback={null}>
        <group 
          scale={isMobile ? 0.7 : 1} 
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI/4, 0]}
        >
          <HeroLights />
          <Room/>
        </group>
      </Suspense>
    </Canvas>
  );
};

export default HeroExperience;
