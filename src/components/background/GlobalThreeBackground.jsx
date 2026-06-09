import { useRef, useMemo, useEffect } from 'react';
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
  const count = 3000;

  const { originalPositions, colors } = useMemo(() => {
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2.5 + 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      originalPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      originalPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      originalPositions[i * 3 + 2] = radius * Math.cos(phi);

      const colorType = Math.random();
      if (colorType > 0.66) {
        colors[i * 3] = 0.9; colors[i * 3 + 1] = 0.7; colors[i * 3 + 2] = 0.4;
      } else if (colorType > 0.33) {
        colors[i * 3] = 0.6; colors[i * 3 + 1] = 0.3; colors[i * 3 + 2] = 0.8;
      } else {
        colors[i * 3] = 0.9; colors[i * 3 + 1] = 0.9; colors[i * 3 + 2] = 0.9;
      }
    }
    return { originalPositions, colors };
  }, [count]);

  const positions = useMemo(() => new Float32Array(originalPositions), [originalPositions]);
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock, camera }) => {
    if (!ref.current) return;
    
    // Base rotation
    ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    ref.current.rotation.z = clock.getElapsedTime() * 0.02;

    const positionsAttr = ref.current.geometry.attributes.position;
    const posArray = positionsAttr.array;
    
    // Compute mouse vector in 3D
    const vector = new THREE.Vector3(mousePos.current.x, mousePos.current.y, 0.5);
    vector.unproject(camera);
    vector.sub(camera.position).normalize();
    const distanceToPlane = -camera.position.z / vector.z;
    const mouse3D = camera.position.clone().add(vector.multiplyScalar(distanceToPlane));
    
    // World inverse matrix to convert world mouse position to local particle space
    const invMat = new THREE.Matrix4().copy(ref.current.matrixWorld).invert();
    mouse3D.applyMatrix4(invMat); 

    // Repel logic
    const repelRadius = 1.8;
    const repelForce = 0.4;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      const dx = mouse3D.x - ox;
      const dy = mouse3D.y - oy;
      const dz = mouse3D.z - oz;
      const distSq = dx*dx + dy*dy + dz*dz;

      if (distSq < repelRadius * repelRadius) {
        const dist = Math.sqrt(distSq);
        const force = (repelRadius - dist) / repelRadius * repelForce;
        
        posArray[idx]     = ox - (dx / dist) * force;
        posArray[idx + 1] = oy - (dy / dist) * force;
        posArray[idx + 2] = oz - (dz / dist) * force;
      } else {
        posArray[idx]     += (ox - posArray[idx]) * 0.1;
        posArray[idx + 1] += (oy - posArray[idx + 1]) * 0.1;
        posArray[idx + 2] += (oz - posArray[idx + 2]) * 0.1;
      }
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

// Central glowing orb — small, elegant, distorted
const CentralOrb = () => {
  const meshRef = useRef(null);
  const ringsRef = useRef(null);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1 + mouse.x * 0.08;
      meshRef.current.rotation.x = mouse.y * 0.08;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.x = t * 0.05;
      ringsRef.current.rotation.y = t * 0.08;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
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
      color: ['#14B8A6', '#8B5CF6', '#4338CA'][i % 3],
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
    <pointLight position={[5, 4, 5]}    color="#14B8A6" intensity={3.5} distance={25} />
    <pointLight position={[-5, -3, -5]} color="#8B5CF6" intensity={3}   distance={22} />
    <pointLight position={[0, 4, 6]}    color="#4338CA" intensity={1.5} distance={16} />

    {/* Fog for deep space fade-out effect */}
    <fog attach="fog" args={['#050816', 5, 25]} />

    {/* Deep starfield */}
    <Stars radius={100} depth={50} count={8000} factor={4} saturation={0.5} fade speed={2} />



    <group scale={[0.6, 0.6, 0.6]}>
      <CentralOrb />
      <ParticleField />
    </group>
    <FloatingCubes />
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


  </div>
);

export default GlobalThreeBackground;
