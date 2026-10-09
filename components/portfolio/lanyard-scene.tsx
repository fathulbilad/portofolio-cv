"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, type RapierRigidBody, type RigidBodyProps } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { CatmullRomCurve3, Mesh, MeshStandardMaterial, RepeatWrapping, Vector2, Vector3 } from "three";

type BadgeModel = ReturnType<typeof useGLTF> & {
  nodes: { card: Mesh; clip: Mesh; clamp: Mesh };
  materials: { base: MeshStandardMaterial; metal: MeshStandardMaterial };
};

export default function LanyardScene({ paused }: { paused: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 17], fov: 20 }} dpr={[1, 1.5]} frameloop={paused ? "demand" : "always"}
      gl={{ alpha: true, antialias: true }} fallback={<p className="lanyard-fallback-message">Fathul Bilad · Full Stack Software Engineer · MII</p>}>
      <ambientLight intensity={Math.PI} />
      <Suspense fallback={null}>
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60} paused={paused}><Band /></Physics>
        <Environment blur={0.75} resolution={128}>
          <Lightformer intensity={2} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={8} position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}

function Band() {
  const fixed = useRef<RapierRigidBody>(null!);
  const firstJoint = useRef<RapierRigidBody>(null!);
  const secondJoint = useRef<RapierRigidBody>(null!);
  const thirdJoint = useRef<RapierRigidBody>(null!);
  const card = useRef<RapierRigidBody>(null!);
  const band = useRef<Mesh<MeshLineGeometry, MeshLineMaterial>>(null);
  const firstSmooth = useRef<Vector3 | null>(null);
  const secondSmooth = useRef<Vector3 | null>(null);
  const { nodes, materials } = useGLTF("/lanyard/card.glb") as BadgeModel;
  const sourceTexture = useTexture("/lanyard/lanyard.png");
  const { width, height } = useThree((state) => state.size);
  const [dragged, setDragged] = useState<Vector3 | null>(null);
  const [hovered, setHovered] = useState(false);
  const [curve] = useState(() => {
    const path = new CatmullRomCurve3(Array.from({ length: 4 }, () => new Vector3()));
    path.curveType = "chordal";
    return path;
  });
  const [vectors] = useState(() => ({ position: new Vector3(), direction: new Vector3() }));
  const geometry = useMemo(() => new MeshLineGeometry(), []);
  const texture = useMemo(() => {
    const clone = sourceTexture.clone();
    clone.wrapS = clone.wrapT = RepeatWrapping;
    clone.needsUpdate = true;
    return clone;
  }, [sourceTexture]);
  const material = useMemo(() => {
    const strap = new MeshLineMaterial({ color: "white", resolution: new Vector2(width, height), map: texture, useMap: 1, repeat: new Vector2(-4, 1), lineWidth: 1 });
    strap.depthTest = false;
    return strap;
  }, [texture, width, height]);
  const bodyProps: RigidBodyProps = { colliders: false, canSleep: true, angularDamping: 4, linearDamping: 4 };

  useRopeJoint(fixed, firstJoint, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(firstJoint, secondJoint, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(secondJoint, thirdJoint, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(thirdJoint, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => () => { geometry.dispose(); texture.dispose(); }, [geometry, texture]);
  useEffect(() => () => material.dispose(), [material]);
  useEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>(".lanyard-stage canvas");
    if (canvas) canvas.style.cursor = dragged ? "grabbing" : hovered ? "grab" : "default";
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (!fixed.current || !firstJoint.current || !secondJoint.current || !thirdJoint.current || !card.current || !band.current) return;
    if (dragged) {
      vectors.position.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      vectors.direction.copy(vectors.position).sub(state.camera.position).normalize();
      vectors.position.add(vectors.direction.multiplyScalar(state.camera.position.length())).sub(dragged);
      for (const body of [card, firstJoint, secondJoint, thirdJoint]) body.current.wakeUp();
      card.current.setNextKinematicTranslation(vectors.position);
    }
    if (!firstSmooth.current) firstSmooth.current = new Vector3().copy(firstJoint.current.translation());
    if (!secondSmooth.current) secondSmooth.current = new Vector3().copy(secondJoint.current.translation());
    for (const [smooth, body] of [[firstSmooth.current, firstJoint.current], [secondSmooth.current, secondJoint.current]] as const) {
      const distance = Math.max(0.1, Math.min(1, smooth.distanceTo(body.translation())));
      smooth.lerp(body.translation(), Math.min(1, delta * distance * 50));
    }
    curve.points[0].copy(thirdJoint.current.translation());
    curve.points[1].copy(secondSmooth.current);
    curve.points[2].copy(firstSmooth.current);
    curve.points[3].copy(fixed.current.translation());
    geometry.setPoints(curve.getPoints(width < 480 ? 16 : 32));
    const velocity = card.current.angvel();
    const rotation = card.current.rotation();
    card.current.setAngvel({ x: velocity.x, y: velocity.y - rotation.y * 0.25, z: velocity.z }, true);
  });

  function releaseCard(event: ThreeEvent<PointerEvent>) {
    event.stopPropagation();
    const target = event.target as Element;
    if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
    setDragged(null);
  }

  return (
    <>
      <group position={[0, 3.7, 0]}>
        <RigidBody ref={fixed} {...bodyProps} type="fixed" />
        <RigidBody ref={firstJoint} {...bodyProps} position={[0, -1, 0]}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody ref={secondJoint} {...bodyProps} position={[0, -2, 0]}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody ref={thirdJoint} {...bodyProps} position={[0, -3, 0]}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody ref={card} {...bodyProps} position={[0, -4.45, 0]} type={dragged ? "kinematicPosition" : "dynamic"}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group scale={2.25} position={[0, -1.2, -0.05]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onPointerUp={releaseCard} onPointerCancel={releaseCard}
            onPointerDown={(event) => {
              event.stopPropagation();
              (event.target as Element).setPointerCapture(event.pointerId);
              setDragged(new Vector3().copy(event.point).sub(card.current.translation()));
            }}>
            <mesh geometry={nodes.card.geometry}><meshPhysicalMaterial map={materials.base.map} roughness={0.9} metalness={0.5} clearcoat={0.5} clearcoatRoughness={0.2} /></mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} geometry={geometry} material={material} />
    </>
  );
}
