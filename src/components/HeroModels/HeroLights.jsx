import { RectAreaLight } from "three";
const HeroLights = () => {
  return (
    <>
      {/* <spotLight
        position={[3, 6, 6]}
        angle={0.15}
        intensity={100}
        penumbra={0.2}
        light softness edge 
        color="white"
      /> */}
      <spotLight
        position={[4, 5, 4]}
        angle={0.3}
        intensity={40}
        penumbra={0.5}
        color="#4cc9f0"
      />
      <spotLight
        position={[-3, 5, 5]}
        angle={0.4}
        intensity={60}
        penumbra={1}
        color="#9d4edd"
      />

      {/* Why use object={new THREE.RectAreaLight(...)}?
RectAreaLight is not a built-in JSX component in @react-three/fiber (unlike <spotLight />, <pointLight />, etc.).
To use it, you must create a THREE.js object manually and pass it to the <primitive /> component, which renders any raw THREE.js object.
Why not needed for <spotLight />?
<spotLight /> is a built-in JSX component in @react-three/fiber.
You can use it directly in JSX, and props like position, intensity, etc., are mapped automatically. */}

      <primitive
        // Create a new RectAreaLight object from THREE.js with color, width, height
        object={new RectAreaLight("#A259FF", 8, 3, 2)}
        position={[1, 3, 4]}
        intensity={15}
        rotation={[-Math.PI / 4, Math.PI / 4, 0]}
      />
      <pointLight position={[0, 1, 0]} intensity={10} color="#7209b7" />

      <pointLight position={[1, 2, -2]} intensity={10} color="#0d00a4" />
    </>
  );
};

export default HeroLights;
