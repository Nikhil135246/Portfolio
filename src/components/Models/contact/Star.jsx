import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Preload
} from "@react-three/drei";
import { inSphere } from "maath/random";
/* ye like pehle import * as random from "maath/random/dist/maath-random.esm";
    Thi per kyu ki apne ko sirf inSphere chahiye isliye direct import kiya hai */


// Individual star component
const Stars = (props) => {
  const ref = useRef();
  
 const sphere = useMemo(
  () => inSphere(new Float32Array(5001), { radius: 1.2 }),
  []
);


  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

    return (
    // Refrense : https://youtu.be/0fYi8SGA20k?t=9313
    <group rotation={[0, 0, -Math.PI / 4]}>
      {/* Debug: Red wireframe bounding box */}
      {/* <mesh>
        <boxGeometry args={[2.5, 2.5, 2.5]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh> */}
{/* <axesHelper args={[5]} /> */}
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarCanvas = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-[1] pointer-events-none">
      <Canvas  camera={{ position: [0, 0, 1 ] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarCanvas;
