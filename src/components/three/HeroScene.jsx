import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = () => {
  const pointsRef = useRef(null);

  const { positions, colors } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2.5 + 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorType = Math.random();
      if (colorType > 0.66) {
        colors[i * 3] = 0.9; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 0.4;
      } else if (colorType > 0.33) {
        colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 0.8;
      } else {
        colors[i * 3] = 0.9; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.9;
      }
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      pointsRef.current.rotation.z = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const Planet = () => {
  const meshRef = useRef(null);
  const ringsRef = useRef(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      ringsRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#14B8A6"
          emissive="#0D9488"
          emissiveIntensity={0.4}
          metalness={0.4}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
        <mesh scale={[1.05, 1.05, 1.05]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <meshBasicMaterial color="#14B8A6" transparent opacity={0.3} side={THREE.BackSide} />
        </mesh>
      </mesh>

      <group ref={ringsRef}>
        <mesh rotation={[Math.PI / 2.5, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.015, 16, 100]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.6} />
        </mesh>
        
        <mesh rotation={[Math.PI / 2.1, -Math.PI / 6, 0]}>
          <torusGeometry args={[3.0, 0.015, 16, 100]} />
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.4} />
          <mesh position={[3.0, 0, 0]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#F4A261" emissive="#E76F51" emissiveIntensity={0.5} />
          </mesh>
        </mesh>

        <mesh rotation={[Math.PI / 1.8, Math.PI / 8, 0]}>
          <torusGeometry args={[4.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#4338CA" transparent opacity={0.3} />
          <mesh position={[-4.2, 0, 0]}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial color="#8B5CF6" emissive="#14B8A6" emissiveIntensity={0.5} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#14B8A6" intensity={3} distance={20} />
      <pointLight position={[-5, -3, -5]} color="#8B5CF6" intensity={2.5} distance={20} />
      <pointLight position={[0, 2, 5]} color="#4338CA" intensity={1.5} distance={15} />

      <Stars radius={60} depth={50} count={1500} factor={2} saturation={0} fade speed={1} />

      <Planet />
      <ParticleField />
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="w-full h-full relative z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
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
