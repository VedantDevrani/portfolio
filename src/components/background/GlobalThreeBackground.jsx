import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Scroll-reactive camera drift and deep space exploration
const ScrollCamera = () => {
  const { camera, scene } = useThree();
  const smooth = useRef(0);

  useFrame(({ clock }) => {
    const total = document.body.scrollHeight - window.innerHeight;
    const scroll = total > 0 ? window.scrollY / total : 0;
    smooth.current += (scroll - smooth.current) * 0.04;
    
    const t = clock.getElapsedTime() * 0.1;

    // Fly deep into the Z-axis as we scroll down
    const depth = 6.5 - smooth.current * 25; 

    camera.position.z = depth;
    // Add a bit of natural drifting motion
    camera.position.y = -smooth.current * 3.0 + Math.sin(t * 2) * 1.5;
    camera.position.x = Math.cos(t) * 2.0;
    
    // Look ahead into the depth of space, with a slight tilt
    camera.lookAt(camera.position.x * 0.5, camera.position.y * 0.5, depth - 10);

    // Dynamic fog: gets darker and thicker as we go deeper
    if (scene.fog) {
      scene.fog.near = 2 - smooth.current * 1.5; // Closer near-plane
      scene.fog.far = 25 - smooth.current * 15;  // Closer far-plane (darker)
    }
  });

  return null;
};

// GPU particle cloud
const ParticleField = () => {
  const ref = useRef(null);

  const { positions, colors } = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 7 + 1.5;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.random() * Math.PI;

      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;   // spread vertically for scroll
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const isCyan = Math.random() > 0.5;
      colors[i * 3]     = isCyan ? 0    : 0.49;
      colors[i * 3 + 1] = isCyan ? 0.9  : 0.23;
      colors[i * 3 + 2] = isCyan ? 1    : 0.93;
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y =  clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={colors.length / 3}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  );
};

// Central glowing orb — small, elegant, distorted
const CentralOrb = () => {
  const mesh = useRef(null);
  const glow = useRef(null);
  const r1   = useRef(null);
  const r2   = useRef(null);
  const r3   = useRef(null);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.25 + mouse.x * 0.08;
      mesh.current.rotation.x = t * 0.15 + mouse.y * 0.08;
    }
    if (glow.current) {
      glow.current.rotation.y = -t * 0.12;
      glow.current.rotation.x =  t * 0.08;
    }
    // Thin orbit rings rotate independently
    if (r1.current) { r1.current.rotation.z = t * 0.18; }
    if (r2.current) { r2.current.rotation.x = t * 0.14; r2.current.rotation.y = t * 0.1; }
    if (r3.current) { r3.current.rotation.z = -t * 0.1; r3.current.rotation.x = t * 0.12; }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.5}>
      {/* Core orb */}
      <mesh ref={mesh}>
        <sphereGeometry args={[0.72, 64, 64]} />
        <MeshDistortMaterial
          color="#00BFFF"
          emissive="#004466"
          emissiveIntensity={0.9}
          metalness={1}
          roughness={0.05}
          distort={0.35}
          speed={2.5}
        />
      </mesh>

      {/* Inner soft glow shell */}
      <mesh ref={glow}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      {/* ── Thin orbit ring 1 — cyan, tilted 30° ── */}
      <mesh ref={r1} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[1.7, 0.004, 4, 180]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.55} />
      </mesh>

      {/* ── Thin orbit ring 2 — purple, tilted 60° ── */}
      <mesh ref={r2} rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[2.1, 0.004, 4, 180]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0.45} />
      </mesh>

      {/* ── Thin orbit ring 3 — pink, almost flat ── */}
      <mesh ref={r3} rotation={[Math.PI * 0.08, 0.4, 0]}>
        <torusGeometry args={[2.55, 0.003, 4, 180]} />
        <meshBasicMaterial color="#E879F9" transparent opacity={0.3} />
      </mesh>

      {/* Tiny satellite dots on ring 1 */}
      {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => (
        <SatelliteDot key={i} orbitRadius={1.7} angleOffset={angle} tilt={Math.PI / 6} color={['#00E5FF', '#7C3AED', '#E879F9'][i]} speed={0.4} />
      ))}
    </Float>
  );
};

// Small dot that orbits along a ring path
const SatelliteDot = ({ orbitRadius, angleOffset, tilt, color, speed }) => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + angleOffset;
    const x = Math.cos(t) * orbitRadius;
    const z = Math.sin(t) * orbitRadius;
    // Apply tilt rotation around X
    ref.current.position.set(x, z * Math.sin(tilt), z * Math.cos(tilt));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};


// Floating mini cubes scattered in space
const Cube = ({ position, scale, color, speed, offset }) => {
  const ref = useRef(null);
  const [px, py, pz] = position;

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.set(px, py + Math.sin(t) * 0.28, pz);
      ref.current.rotation.x += 0.009;
      ref.current.rotation.y += 0.014;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} metalness={0.8} roughness={0.15} />
    </mesh>
  );
};

const FloatingCubes = () => {
  const cubes = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      position: [
        Math.sin((i / 16) * Math.PI * 2) * (3.0 + Math.random() * 2),
        (Math.random() - 0.5) * 5,
        Math.cos((i / 16) * Math.PI * 2) * (2 + Math.random() * 1.5),
      ],
      scale: Math.random() * 0.14 + 0.04,
      color: ['#00E5FF', '#7C3AED', '#E879F9'][i % 3],
      speed: Math.random() * 0.4 + 0.15,
      offset: Math.random() * Math.PI * 2,
    })),
  []);

  return <>{cubes.map((c, i) => <Cube key={i} {...c} />)}</>;
};

// Ambient glow orbs
const GlowOrb = ({ position, color, scale }) => {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.05 + Math.sin(clock.getElapsedTime() * 0.4) * 0.02;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.05} side={THREE.BackSide} />
    </mesh>
  );
};

// The full scene
const BackgroundScene = () => (
  <>
    <ambientLight intensity={0.3} />
    <pointLight position={[5, 4, 5]}    color="#00E5FF" intensity={3.5} distance={25} />
    <pointLight position={[-5, -3, -5]} color="#7C3AED" intensity={3}   distance={22} />
    <pointLight position={[0, 4, 6]}    color="#E879F9" intensity={1.5} distance={16} />

    {/* Fog for deep space fade-out effect */}
    <fog attach="fog" args={['#050816', 5, 25]} />

    {/* Deep starfield */}
    <Stars radius={90} depth={70} count={2500} factor={3} saturation={0} fade speed={0.7} />

    {/* Soft glow volumes */}
    <GlowOrb position={[ 2.5,  1.5, -4]} color="#00E5FF" scale={[7, 7, 7]} />
    <GlowOrb position={[-3.5, -2,  -5]} color="#7C3AED" scale={[9, 9, 9]} />
    <GlowOrb position={[ 0,    3,  -6]} color="#E879F9" scale={[5, 5, 5]} />

    <CentralOrb />
    <FloatingCubes />
    <ParticleField />
    <ScrollCamera />
  </>
);

// ─── Exported component ───────────────────────────────────────────────────────
const GlobalThreeBackground = () => (
  <div
    className="fixed inset-0 pointer-events-none"
    style={{ zIndex: 0 }}
    aria-hidden="true"
  >
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 58 }}
      dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <BackgroundScene />
    </Canvas>

    {/* Very subtle edge darkening only — does NOT cover center */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, rgba(5,8,22,0.25) 100%)`,
      }}
    />
  </div>
);

export default GlobalThreeBackground;
