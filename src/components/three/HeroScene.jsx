import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle system component
const ParticleField = () => {
  const pointsRef = useRef(null);

  const { positions, colors } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 5 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const isCyan = Math.random() > 0.5;
      colors[i * 3] = isCyan ? 0 : 0.49;
      colors[i * 3 + 1] = isCyan ? 0.9 : 0.23;
      colors[i * 3 + 2] = isCyan ? 1 : 0.93;
    }

    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
};

// Main torus knot
const MainObject = () => {
  const meshRef = useRef(null);
  const ringRef = useRef(null);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15 + mouse.y * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2 + mouse.x * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = -clock.getElapsedTime() * 0.08;
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 180, 20, 2, 3]} />
        <MeshDistortMaterial
          color="#00E5FF"
          emissive="#004466"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
          distort={0.08}
          speed={2}
        />
      </mesh>

      {/* Glow orbit ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.012, 8, 100]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.5} />
      </mesh>

      {/* Second orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.008, 8, 100]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.2} />
      </mesh>
    </Float>
  );
};

// Floating cubes
const CubeInstance = ({ position, scale, color, speed, offset }) => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.y = position[1] + Math.sin(t) * 0.3;
      ref.current.rotation.x += 0.01;
      ref.current.rotation.y += 0.015;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const FloatingCubes = () => {
  const cubesData = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        position: [
          Math.sin((i / 10) * Math.PI * 2) * 3.5,
          Math.cos((i / 10) * Math.PI * 2) * 1.5,
          Math.sin((i / 10) * Math.PI * 2 + 1) * 2,
        ],
        scale: Math.random() * 0.1 + 0.04,
        color: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#7C3AED' : '#E879F9',
        speed: Math.random() * 0.5 + 0.2,
        offset: Math.random() * Math.PI * 2,
      })),
    []
  );

  return (
    <>
      {cubesData.map((cube, i) => (
        <CubeInstance key={i} {...cube} />
      ))}
    </>
  );
};

// Inner scene
const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#00E5FF" intensity={3} distance={20} />
      <pointLight position={[-5, -3, -5]} color="#7C3AED" intensity={2.5} distance={20} />
      <pointLight position={[0, 2, 5]} color="#E879F9" intensity={1.5} distance={15} />

      <Stars radius={60} depth={50} count={1500} factor={2} saturation={0} fade speed={1} />

      <MainObject />
      <FloatingCubes />
      <ParticleField />
    </>
  );
};

// Main exported component
const HeroScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          autoRotate
          autoRotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene;
