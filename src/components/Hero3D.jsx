import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, Sparkles, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}models/handi.glb`
const REST_Y = 1.46 // lid pivot height (matches the Blender export)
const LIFT = 1.5 // how far the lid floats up when open

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeOutBack = (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2)

/* ---------- procedural textures (no external files) ---------- */

function useRiceTexture() {
  return useMemo(() => {
    const size = 512
    const c = document.createElement('canvas')
    c.width = c.height = size
    const g = c.getContext('2d')
    g.fillStyle = '#EBD08A'
    g.fillRect(0, 0, size, size)
    const rnd = (a, b) => a + Math.random() * (b - a)
    // saffron-dyed streaks
    for (let i = 0; i < 900; i++) {
      g.fillStyle = `rgba(${rnd(215, 240)},${rnd(110, 160)},${rnd(20, 50)},${rnd(0.25, 0.6)})`
      g.save(); g.translate(rnd(0, size), rnd(0, size)); g.rotate(rnd(0, Math.PI))
      g.fillRect(0, 0, rnd(8, 22), rnd(2, 4)); g.restore()
    }
    // white long grains
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(255,${rnd(244, 255)},${rnd(220, 240)},${rnd(0.6, 0.95)})`
      g.save(); g.translate(rnd(0, size), rnd(0, size)); g.rotate(rnd(0, Math.PI))
      g.beginPath(); g.ellipse(0, 0, rnd(5, 9), rnd(1.4, 2.4), 0, 0, Math.PI * 2); g.fill(); g.restore()
    }
    // mint + fried onion flecks
    for (let i = 0; i < 160; i++) {
      g.fillStyle = Math.random() > 0.5 ? 'rgba(70,130,60,0.9)' : 'rgba(150,90,30,0.9)'
      g.save(); g.translate(rnd(0, size), rnd(0, size)); g.rotate(rnd(0, Math.PI))
      g.fillRect(0, 0, rnd(5, 12), rnd(3, 6)); g.restore()
    }
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.anisotropy = 4
    return t
  }, [])
}

function useSteamTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 128
    const g = c.getContext('2d')
    const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62)
    grad.addColorStop(0, 'rgba(255,248,232,0.9)')
    grad.addColorStop(0.5, 'rgba(255,240,215,0.35)')
    grad.addColorStop(1, 'rgba(255,240,215,0)')
    g.fillStyle = grad
    g.fillRect(0, 0, 128, 128)
    return new THREE.CanvasTexture(c)
  }, [])
}

/* ---------- animated parts ---------- */

function Biryani({ openRef }) {
  const tex = useRiceTexture()
  const ref = useRef()
  useFrame(() => {
    // the rice "settles" into view as the lid comes off
    const o = openRef.current
    if (ref.current) ref.current.scale.set(1, 0.42 + o * 0.06, 1)
  })
  return (
    <mesh ref={ref} position={[0, 1.3, 0]}>
      <sphereGeometry args={[0.83, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
      <meshStandardMaterial map={tex} bumpMap={tex} bumpScale={1.4} roughness={0.85} metalness={0} />
    </mesh>
  )
}

const STEAM_COUNT = 14
function Steam({ openRef }) {
  const tex = useSteamTexture()
  const group = useRef()
  const seeds = useMemo(
    () => Array.from({ length: STEAM_COUNT }, (_, i) => ({
      phase: i / STEAM_COUNT,
      angle: Math.random() * Math.PI * 2,
      r: Math.random() * 0.45,
      speed: 0.14 + Math.random() * 0.08,
    })),
    [],
  )
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const o = openRef.current
    group.current.children.forEach((s, i) => {
      const k = seeds[i]
      const life = (t * k.speed + k.phase) % 1
      s.position.set(
        Math.cos(k.angle + life * 2) * (k.r + life * 0.35),
        1.55 + life * 2.8,
        Math.sin(k.angle + life * 2) * (k.r + life * 0.35),
      )
      const sc = 0.5 + life * 1.5
      s.scale.set(sc, sc, 1)
      s.material.opacity = Math.sin(life * Math.PI) * 0.5 * o
    })
  })
  return (
    <group ref={group} position={[0, -1.05, 0]}>
      {seeds.map((_, i) => (
        <sprite key={i}>
          <spriteMaterial map={tex} transparent depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </group>
  )
}

const STRANDS = 46
/** Saffron threads spiralling out of the pot while it is open. */
function SaffronStrands({ openRef }) {
  const mesh = useRef()
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const seeds = useMemo(
    () => Array.from({ length: STRANDS }, () => ({
      phase: Math.random(),
      a: Math.random() * Math.PI * 2,
      speed: 0.07 + Math.random() * 0.07,
      spin: (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.8),
      tilt: Math.random() * Math.PI,
    })),
    [],
  )
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const o = openRef.current
    seeds.forEach((k, i) => {
      const life = (t * k.speed + k.phase) % 1
      const rad = 0.15 + life * 1.5
      const ang = k.a + t * k.spin * 0.5 + life * 5
      dummy.position.set(Math.cos(ang) * rad, 1.6 + life * 3.2, Math.sin(ang) * rad)
      dummy.rotation.set(k.tilt + t * 0.6, ang, k.tilt * 0.5)
      const fade = Math.sin(life * Math.PI) * o
      dummy.scale.setScalar(Math.max(0.0001, fade))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={mesh} args={[null, null, STRANDS]} position={[0, -1.05, 0]} frustumCulled={false}>
      <capsuleGeometry args={[0.012, 0.22, 4, 8]} />
      <meshStandardMaterial color="#E0451F" emissive="#B02A0C" emissiveIntensity={0.6} roughness={0.5} />
    </instancedMesh>
  )
}

/**
 * The hero scene. Sequence: the lid hovers, drops and seals the pot ("dum"),
 * then lifts off to reveal the biryani. Tap/click the pot to toggle the lid.
 * Scrolling the page turns the pot and eases it away.
 */
function Scene({ onOpenChange }) {
  const { scene } = useGLTF(MODEL_URL)
  const root = useRef()
  const lid = useRef()
  const openRef = useRef(1) // 0 = sealed, 1 = lid lifted (animated value)
  const target = useRef(reducedMotion ? 1 : 1)
  const mode = useRef(reducedMotion ? 'idle' : 'intro')
  const squash = useRef(0)
  const hovered = useRef(false)

  const { pot, lidNode } = useMemo(() => {
    let pot, lidNode
    scene.traverse((o) => {
      if (o.name.startsWith('Lid')) lidNode = o
      if (o.name.startsWith('Pot')) pot = o
    })
    return { pot, lidNode }
  }, [scene])

  useEffect(() => {
    lid.current?.add(lidNode)
    // lidNode keeps its own Blender pivot offset; zero it so we drive position ourselves
    lidNode.position.set(0, 0, 0)
  }, [lidNode])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // --- choreography ---
    if (mode.current === 'intro') {
      if (t < 0.9) target.current = 1
      else if (t < 2.4) target.current = 0 // lid drops and seals
      else { target.current = 1; mode.current = 'idle' } // then lifts to reveal
    }
    const prev = openRef.current
    const speed = target.current === 0 ? 5 : 2.6
    openRef.current += (target.current - openRef.current) * Math.min(1, delta * speed)
    if (prev > 0.12 && openRef.current <= 0.12 && squash.current === 0) squash.current = 1
    squash.current = Math.max(0, squash.current - delta * 3)
    onOpenChange?.(target.current === 1)

    const o = openRef.current
    // --- lid: rises, tilts and gently floats when open ---
    const bob = Math.sin(t * 1.3) * 0.06 * o
    lid.current.position.y = REST_Y + LIFT * o + bob
    lid.current.rotation.z = Math.sin(t * 0.9) * 0.08 * o + o * 0.18
    lid.current.rotation.y = t * 0.45 * o
    lid.current.rotation.x = Math.cos(t * 0.7) * 0.05 * o

    // --- pot: scroll-linked turn + parallax, pointer tilt, seal squash ---
    const p = clamp01(window.scrollY / Math.max(1, window.innerHeight))
    const g = root.current
    if (!reducedMotion) g.rotation.y += delta * (0.25 + p * 2.2)
    const pt = state.pointer
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pt.y * 0.2 + p * 0.35, 0.06)
    g.position.x = THREE.MathUtils.lerp(g.position.x, pt.x * 0.3, 0.05)
    g.position.y = -p * 0.9 + Math.sin(t * 1.1) * 0.05
    const sq = Math.sin(squash.current * Math.PI) * 0.035
    g.scale.set(1 + sq, 1 - sq * 1.6, 1 + sq)
    const s = 1 - p * 0.18
    g.scale.multiplyScalar(s)
  })

  const toggle = (e) => {
    e.stopPropagation()
    mode.current = 'idle'
    target.current = target.current === 1 ? 0 : 1
  }

  return (
    <group
      ref={root}
      onClick={toggle}
      onPointerOver={() => { hovered.current = true; document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { hovered.current = false; document.body.style.cursor = '' }}
    >
      <group position={[0, -1.05, 0]}>
        <primitive object={pot} />
        <group ref={lid} position={[0, REST_Y, 0]} />
        <Biryani openRef={openRef} />
      </group>
      <Steam openRef={openRef} />
      <SaffronStrands openRef={openRef} />
    </group>
  )
}

useGLTF.preload(MODEL_URL)

export default function Hero3D({ active = true, onOpenChange }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.3, 7.0], fov: 36 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.7, 0)}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} color="#fff1d6" />
      <pointLight position={[-4, 1, -2]} intensity={14} color="#C19A4B" />
      <pointLight position={[0, 2.2, 0]} intensity={6} color="#ffb454" distance={4} />

      <Environment resolution={256} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={4} position={[0, 5, 2]} scale={[8, 3, 1]} color="#fff3dc" />
        <Lightformer form="rect" intensity={2.5} position={[-5, 1, 1]} scale={[3, 5, 1]} color="#ffd9a0" />
        <Lightformer form="rect" intensity={2} position={[5, 0, -2]} scale={[3, 5, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={3} position={[0, -1, 5]} scale={4} color="#ffe2b0" />
      </Environment>

      <Scene onOpenChange={onOpenChange} />

      <Sparkles count={45} scale={[6, 5, 6]} size={3.2} speed={reducedMotion ? 0 : 0.35} opacity={0.7} color="#E2C98A" />
      <ContactShadows position={[0, -1.62, 0]} opacity={0.55} scale={7} blur={2.6} far={3} color="#000000" />
    </Canvas>
  )
}
