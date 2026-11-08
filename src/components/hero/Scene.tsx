"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Blob({ mobile }: { mobile: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((state, dt) => {
    const { pointer } = state;
    if (mesh.current) {
      mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, pointer.x * 0.6 + state.clock.elapsedTime * 0.12, 3, dt);
      mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, -pointer.y * 0.4, 3, dt);
    }
    if (ring.current) ring.current.rotation.z += dt * 0.15;
  });
  return (
    <group scale={mobile ? 0.82 : 1}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[1.35, mobile ? 24 : 48]} />
          <MeshDistortMaterial color="#1c2560" metalness={0.8} roughness={0.2} clearcoat={1} clearcoatRoughness={0.15} iridescence={0.7} iridescenceIOR={1.3} distort={0.38} speed={1.6} envMapIntensity={1.7} />
        </mesh>
      </Float>
      <mesh ref={ring} rotation={[1.2, 0.2, 0]}>
        <torusGeometry args={[2.3, 0.006, 8, 160]} />
        <meshBasicMaterial color="#4d8dff" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[1.6, -0.5, 0.4]}>
        <torusGeometry args={[2.75, 0.004, 8, 160]} />
        <meshBasicMaterial color="#8d6bff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/** Lit with generated light panels instead of a downloaded HDR, so nothing extra loads over the network. */
export default function Scene({ mobile }: { mobile: boolean }) {
  return (
    <Canvas dpr={mobile ? [1, 1.5] : [1, 2]} camera={{ position: [0, 0, 5.2], fov: 42 }} gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-3, 5, 2]} intensity={0.8} color="#b9ccff" />
      <Blob mobile={mobile} />
      <Environment resolution={mobile ? 64 : 256}>
        <Lightformer form="rect" intensity={3} color="#4d8dff" position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[6, 10, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#8d6bff" position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[6, 10, 1]} />
        <Lightformer form="rect" intensity={2} color="#ffffff" position={[0, 5, 1]} rotation-x={Math.PI / 2} scale={[8, 3, 1]} />
      </Environment>
    </Canvas>
  );
}
