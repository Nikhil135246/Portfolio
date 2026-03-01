import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { useRef, useEffect } from "react";
import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { useLoadingContext } from "../../context/LoadingContext";
import gsap from "gsap";

/**
 * Camera controls with auto-return feature
 * Returns to the initial orientation when user stops interacting
 */
const CameraControls = () => {
  const controlsRef = useRef();
  const isInteracting = useRef(false);
  const initialAngles = useRef(null);

  // Capture initial camera angles on mount
  useEffect(() => {
    if (controlsRef.current && !initialAngles.current) {
      initialAngles.current = {
        azimuthal: controlsRef.current.getAzimuthalAngle(),
        polar: controlsRef.current.getPolarAngle()
      };
    }
  }, []);

  useFrame(() => {
    if (!controlsRef.current || isInteracting.current || !initialAngles.current) return;
    
    const current = {
      azimuth: controlsRef.current.getAzimuthalAngle(),
      polar: controlsRef.current.getPolarAngle()
    };
    
    // Smoothly interpolate back to initial orientation
    const newAzimuth = current.azimuth + (initialAngles.current.azimuthal - current.azimuth) * 0.05;
    const newPolar = current.polar + (initialAngles.current.polar - current.polar) * 0.05;
    
    controlsRef.current.setAzimuthalAngle(newAzimuth);
    controlsRef.current.setPolarAngle(newPolar);
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
      onEnd={() => setTimeout(() => isInteracting.current = false, 200)}
    />
  );
};

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "max-width: 1024px" });
  const isMobile = useMediaQuery({ query: "max-width: 768px" });
  const containerRef = useRef(null);
  const { isLoaded } = useLoadingContext();
  
  // Fade-in animation when loading completes
  useEffect(() => {
    if (isLoaded && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { 
          opacity: 0,
          
        },
        { 
          opacity: 1,
         
          duration: 1.5,
          ease: "power2.out",
        }
      );
    }
  }, [isLoaded]);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ opacity: 0 }} // Start invisible
    >
      <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
        <CameraControls />
        <Particles count={100} />
        <group 
          scale={isMobile ? 0.7 : 1} 
          position={[0, -3.6, 0]}
          rotation={[0, -Math.PI / 3.8, 0]}
        >
          <HeroLights />
          <Room />
        </group>
      </Canvas>
    </div>
  );
};

export default HeroExperience;
