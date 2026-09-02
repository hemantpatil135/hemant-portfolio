"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { orbitTools, type StackTool } from "@/lib/data";
import { TechIcon } from "@/components/ui/TechIcon";
import { colors } from "@/lib/theme";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * React is the sun: `orbitRadius: 0` and `planetType: "sun"` in the data. The
 * remaining tools orbit it in three lanes banded from the `orbitRadius`
 * progression (a single 0→33 sequence) so seventeen of them never crowd one ring.
 */
const SUN: StackTool =
  orbitTools.find((tool) => tool.planetType === "sun") ?? orbitTools[0];
const LANES = [
  { radius: 3.15, speed: 0.2, rotation: [0.07, 0, -0.11] as const },
  { radius: 4.75, speed: -0.13, rotation: [-0.1, 0, 0.08] as const },
  { radius: 6.15, speed: 0.085, rotation: [0.04, 0, 0.03] as const },
];

const laneOf = (tool: StackTool) =>
  tool.orbitRadius <= 8 ? 0 : tool.orbitRadius <= 19 ? 1 : 2;

const CORE_RADIUS = 1.05;

/** Shared with the Canvas camera so the fit maths can use the real values. */
const CAMERA = { position: [0, 7.8, 10] as const, fov: 42 };
const CAM_DISTANCE = Math.hypot(...CAMERA.position);
const R_OUTER = LANES[LANES.length - 1].radius;
/** World-space room the DOM chips need beyond the outermost orbit. */
const CHIP_MARGIN = 1.15;

/** Chips sit below their planet so they never cover it. */
const LABEL_OFFSET = 26;

interface Slot {
  tool: StackTool;
  lane: number;
  /** Starting angle — lane members are spaced evenly so they never converge. */
  phase: number;
  size: number;
  /** Position in the flat SLOTS list, used to index the imperative ref arrays. */
  index: number;
}

const SLOTS: Slot[] = (() => {
  const byLane: StackTool[][] = [[], [], []];
  orbitTools
    .filter((tool) => tool !== SUN)
    .forEach((tool) => byLane[laneOf(tool)].push(tool));

  return byLane
    .flatMap((members, lane) =>
      members.map((tool, i) => ({
        tool,
        lane,
        phase: (i / members.length) * Math.PI * 2,
        size: 0.2 + Math.min(tool.planetSize, 1.8) * 0.075,
        index: 0,
      })),
    )
    .map((slot, index) => ({ ...slot, index }));
})();

/** Radial-gradient sprite used for the additive halos (cheaper than bloom). */
function makeHaloTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.35, "rgba(255,255,255,0.28)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function System({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const { camera, size } = useThree();

  const system = useRef<THREE.Group>(null);
  const groups = useRef<(THREE.Group | null)[]>([]);
  const bodies = useRef<(THREE.Mesh | null)[]>([]);
  const labels = useRef<(HTMLSpanElement | null)[]>([]);
  const sunLabel = useRef<HTMLSpanElement>(null);
  const spark = useRef<THREE.Mesh>(null);
  const beam = useRef<THREE.LineSegments>(null);

  const sunActive = activeId === SUN.id;

  const halo = useMemo(() => makeHaloTexture(), []);
  const beamGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    return g;
  }, []);
  const scratch = useMemo(
    () => ({
      world: new THREE.Vector3(),
      projected: new THREE.Vector3(),
      right: new THREE.Vector3(),
      origin: new THREE.Vector3(),
      edge: new THREE.Vector3(),
      scale: new THREE.Vector3(),
    }),
    [],
  );

  useEffect(
    () => () => {
      beamGeom.dispose();
      halo.dispose();
    },
    [beamGeom, halo],
  );

  // Fit the system to whichever axis actually constrains it, rather than
  // guessing from aspect alone — a near-square stage was shrinking it to 70%.
  const aspect = size.width / Math.max(1, size.height);
  const halfH = Math.tan(((CAMERA.fov / 2) * Math.PI) / 180) * CAM_DISTANCE;
  const elevation = CAMERA.position[1] / CAM_DISTANCE; // how squashed the orbits read
  const fit = THREE.MathUtils.clamp(
    Math.min(
      (halfH * aspect) / (R_OUTER + CHIP_MARGIN),
      halfH / (R_OUTER * elevation + CHIP_MARGIN),
    ),
    0.5,
    1.15,
  );

  useFrame(({ clock }) => {
    const t = reduced ? 6 : clock.elapsedTime;

    // Lane rotation drives every planet's angle on its own tilted plane.
    SLOTS.forEach((slot, i) => {
      const group = groups.current[i];
      if (!group) return;
      const lane = LANES[slot.lane];
      const a = slot.phase + t * lane.speed;
      group.position.set(Math.cos(a) * lane.radius, 0, Math.sin(a) * lane.radius);
    });

    // Screen-space projection for the label pass.
    const { world, projected, right, origin, edge } = scratch;
    origin.set(0, 0, 0).project(camera);
    camera.getWorldDirection(world);
    right.crossVectors(camera.up, world).normalize().multiplyScalar(CORE_RADIUS * fit);
    edge.copy(right).project(camera);
    const coreScreen = {
      x: ((origin.x + 1) / 2) * size.width,
      y: ((1 - origin.y) / 2) * size.height,
      r: Math.abs(((edge.x + 1) / 2) * size.width - ((origin.x + 1) / 2) * size.width),
      depth: origin.z,
    };

    type Placed = { x: number; halfW: number; y: number };
    const placed: Placed[] = [];

    // The sun's label sits just clear of its corona and always wins its space,
    // so an orbiting chip can never land on top of it.
    if (sunLabel.current) {
      const sunY = coreScreen.y + coreScreen.r + 16;
      sunLabel.current.style.transform = `translateY(${Math.round(coreScreen.r + 16)}px)`;
      placed.push({ x: coreScreen.x, y: sunY, halfW: sunLabel.current.offsetWidth / 2 });
    }

    const ranked = SLOTS.map((_slot, i) => {
      const group = groups.current[i];
      if (!group) return { i, ok: false, depth: 1, x: 0, y: 0, halfW: 0 };
      group.getWorldPosition(world);
      projected.copy(world).project(camera);
      return {
        i,
        ok: true,
        depth: projected.z,
        x: ((projected.x + 1) / 2) * size.width,
        // The chip renders below its planet, so collide on where it actually sits.
        y: ((1 - projected.y) / 2) * size.height + LABEL_OFFSET,
        // Measured, not guessed — chip width varies with the tool's name.
        halfW: (labels.current[i]?.offsetWidth ?? 90) / 2,
      };
    })
      .filter((p) => p.ok)
      // Nearest first: a planet in front owns the label space it needs.
      .sort((a, b) =>
        SLOTS[a.i].tool.id === activeId
          ? -1
          : SLOTS[b.i].tool.id === activeId
            ? 1
            : a.depth - b.depth,
      );

    ranked.forEach((p) => {
      const el = labels.current[p.i];
      if (!el) return;
      const isActive = SLOTS[p.i].tool.id === activeId;

      const behindCore =
        p.depth > coreScreen.depth &&
        Math.hypot(p.x - coreScreen.x, p.y - (coreScreen.y + LABEL_OFFSET)) <
          coreScreen.r * 1.05;

      const clash = placed.some(
        (q) => Math.abs(q.x - p.x) < q.halfW + p.halfW + 6 && Math.abs(q.y - p.y) < 22,
      );

      const show = !behindCore && (isActive || !clash);
      if (show) placed.push({ x: p.x, y: p.y, halfW: p.halfW });

      el.style.opacity = show ? (isActive ? "1" : "0.82") : "0";
      el.dataset.active = isActive ? "true" : "false";
    });

    // Energy beam from the sun to the focused planet — nothing to draw when the
    // sun itself is the focus, since it would be a zero-length line.
    const activeIdx = SLOTS.findIndex((s) => s.tool.id === activeId);
    const activeGroup = groups.current[activeIdx];
    const hasBeam = Boolean(activeGroup) && !sunActive;
    if (beam.current) beam.current.visible = hasBeam;
    if (spark.current) spark.current.visible = hasBeam;

    if (hasBeam && activeGroup && system.current) {
      // Planets sit inside inclined lane groups; the beam is a sibling of those
      // groups, so bring the endpoint into the system's own coordinate space.
      activeGroup.getWorldPosition(world);
      system.current.worldToLocal(world);

      const attr = beamGeom.getAttribute("position") as THREE.BufferAttribute;
      attr.setXYZ(0, 0, 0, 0);
      attr.setXYZ(1, world.x, world.y, world.z);
      attr.needsUpdate = true;
      beamGeom.computeBoundingSphere();

      if (spark.current) {
        const f = reduced ? 0.5 : (t * 0.55) % 1;
        spark.current.position.set(world.x * f, world.y * f, world.z * f);
      }
    }

    // Focused planet reads slightly larger without moving off its orbit.
    SLOTS.forEach((slot, i) => {
      const body = bodies.current[i];
      if (!body) return;
      const target = slot.tool.id === activeId ? 1.35 : 1;
      body.scale.lerp(scratch.scale.setScalar(target), 0.12);
    });
  });

  const pointer = useCallback((hovering: boolean) => {
    document.body.style.cursor = hovering ? "pointer" : "auto";
  }, []);

  return (
    <group ref={system} scale={fit}>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 0, 0]} intensity={38} color={colors.primary} distance={22} />
      <pointLight position={[7, 6, 7]} intensity={22} color={colors.accent} />
      <pointLight position={[-7, -3, -6]} intensity={16} color={colors.purple} />

      {/* React is the sun everything else orbits. The corona stays the section's
          warm orange — it is the light source — while the glyph and rim carry
          React's own colour so the centre still reads as React. */}
      <group>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(SUN.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            onSelect(SUN.id);
            pointer(true);
          }}
          onPointerOut={() => pointer(false)}
        >
          <sphereGeometry args={[CORE_RADIUS, 48, 48]} />
          <meshStandardMaterial
            color="#2A1206"
            emissive={colors.primary}
            emissiveIntensity={sunActive ? 0.75 : 0.5}
            roughness={0.42}
            metalness={0.35}
          />
        </mesh>
        <mesh scale={1.035}>
          <sphereGeometry args={[CORE_RADIUS, 22, 16]} />
          <meshBasicMaterial
            color={SUN.color}
            wireframe
            transparent
            opacity={sunActive ? 0.28 : 0.18}
          />
        </mesh>
        <sprite scale={[6.4, 6.4, 1]}>
          <spriteMaterial
            map={halo}
            color={colors.primary}
            blending={THREE.AdditiveBlending}
            transparent
            depthWrite={false}
            opacity={sunActive ? 0.62 : 0.5}
          />
        </sprite>

        {/* React glyph at the centre of the sun */}
        <Html center zIndexRange={[30, 10]} className="pointer-events-none select-none">
          <TechIcon
            name={SUN.icon}
            className="h-11 w-11"
            style={{
              color: SUN.color,
              filter: `drop-shadow(0 0 14px ${SUN.color}) drop-shadow(0 0 26px rgba(249,115,22,0.85))`,
            }}
          />
        </Html>

        {/* Its name, kept clear of the corona by the measured core radius */}
        <Html center zIndexRange={[30, 10]} className="pointer-events-none select-none">
          <span
            ref={sunLabel}
            className="orbit-chip"
            style={{ ["--chip" as string]: SUN.color }}
            data-active={sunActive ? "true" : "false"}
          >
            {SUN.name}
          </span>
        </Html>
      </group>

      {/* Orbit lanes — the ring and its planets share one inclined plane, and
          being real geometry they occlude correctly behind the core. */}
      {LANES.map((lane, li) => (
        <group key={li} rotation={[lane.rotation[0], 0, lane.rotation[2]]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[lane.radius, 0.007, 6, 180]} />
            <meshBasicMaterial
              color={colors.primary}
              transparent
              opacity={0.34}
              toneMapped={false}
            />
          </mesh>

          {SLOTS.filter((s) => s.lane === li).map((slot) => {
            const { tool, index } = slot;
            const isActive = tool.id === activeId;
            return (
              <group
                key={tool.id}
                ref={(el) => {
                  groups.current[index] = el;
                }}
              >
                <mesh
                  ref={(el) => {
                    bodies.current[index] = el;
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(tool.id);
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    onSelect(tool.id);
                    pointer(true);
                  }}
                  onPointerOut={() => pointer(false)}
                >
                  <sphereGeometry args={[slot.size, 32, 32]} />
                  <meshStandardMaterial
                    color={tool.color}
                    emissive={tool.color}
                    emissiveIntensity={isActive ? 1.5 : 0.55}
                    roughness={0.32}
                    metalness={0.55}
                    toneMapped={false}
                  />
                </mesh>
                <sprite scale={[slot.size * 7, slot.size * 7, 1]}>
                  <spriteMaterial
                    map={halo}
                    color={tool.color}
                    blending={THREE.AdditiveBlending}
                    transparent
                    depthWrite={false}
                    opacity={isActive ? 0.55 : 0.26}
                  />
                </sprite>

                {/* Constant screen size: a distanceFactor here would make the
                    chips wildly uneven and invalidate the declutter measurements. */}
                <Html
                  center
                  zIndexRange={[25, 5]}
                  className="pointer-events-none select-none"
                >
                  <span
                    ref={(el) => {
                      labels.current[index] = el;
                    }}
                    className="orbit-chip"
                    style={{
                      ["--chip" as string]: tool.color,
                      transform: `translateY(${LABEL_OFFSET}px)`,
                    }}
                  >
                    <TechIcon name={tool.icon} className="h-3.5 w-3.5" />
                    {tool.name}
                  </span>
                </Html>
              </group>
            );
          })}
        </group>
      ))}

      {/* Focus beam — lineSegments, not line: the JSX name `line` resolves to
          React's SVG intrinsic and can't take a three.js ref. */}
      <lineSegments ref={beam}>
        <primitive object={beamGeom} attach="geometry" />
        <lineBasicMaterial
          color={colors.accent}
          transparent
          opacity={0.55}
          toneMapped={false}
        />
      </lineSegments>
      <mesh ref={spark}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color={colors.star} toneMapped={false} />
      </mesh>

      <Sparkles
        count={reduced ? 0 : 70}
        scale={16}
        size={1.4}
        speed={0.18}
        color={colors.primary}
        opacity={0.45}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.25}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI * 0.16}
        maxPolarAngle={Math.PI * 0.5}
      />
    </group>
  );
}

export default function StackOrbit({
  activeId,
  onSelect,
  paused = false,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  paused?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [...CAMERA.position], fov: CAMERA.fov }}
      dpr={[1, 1.75]}
      // "demand" rather than "never": r3f still performs its initial measure and
      // render, so a paused stage shows a static system instead of a blank,
      // unsized canvas.
      frameloop={paused ? "demand" : "always"}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <System activeId={activeId} onSelect={onSelect} />
      </Suspense>
    </Canvas>
  );
}
