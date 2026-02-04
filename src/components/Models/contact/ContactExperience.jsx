import { OrbitControls, useGLTF, Grid, useHelper } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";


const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  const meshRef = useRef();
  
  // Add bounding box helper
  // useHelper(meshRef, THREE.BoxHelper, "red");

  // add rotation animation
  //   useFrame((state, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += delta * 0.2; // Adjust speed with multiplier
  //   }
  // });
  
  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={1} groundColor={"#ffffff"} /> 
      <primitive 
        object={earth.scene} 
        scale={100} 
        position-y={0} 
        rotation-y={0} 
      />
    </mesh>
  );
};

const ContactExperience = () => {
  return (
    <Canvas shadows camera={{ position: [0, 3, 7], fov: 45 }}>
      {/* <ambientLight intensity={0.5} color="#fff4e6" />

      <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3" />

      <directionalLight
        position={[5, 9, 1]}
        castShadow
        intensity={2.5}
        color="#d5ffb3"
      /> */}

      {/* Add Axes Helper - shows X (red), Y (green), Z (blue) */}
      {/* <axesHelper args={[5]} /> */}
      
      {/* Add Grid Helper */}
      {/* <gridHelper args={[10, 10, "#444444", "#888888"]} /> */}


      <OrbitControls
        autoRotate ={true}
        autoRotateSpeed={0.5}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />

      <group scale={0.03} position={[0, 0, 0]} castShadow>
      {/* <group scale={0.03} position={[0, -1.49, -2]} castShadow>
         <Computer /> */}
        <Earth />
        
        
      </group>
    </Canvas>
  );
};

export default ContactExperience;