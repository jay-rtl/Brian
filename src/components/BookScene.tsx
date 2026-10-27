import { assetUrl } from '../urls';
import { Component, Suspense, useRef, type ReactNode } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, SRGBColorSpace, type Mesh } from 'three';
import type { BookId } from '../data';
// Presentation depth is configurable; it does not assert a physical binding specification.
const DEPTH = 0.20;
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, {failed: boolean}> {
  state = {failed: false};
  static getDerivedStateFromError() {return {failed: true};}
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}
function Model({id}: {id: BookId}) {
  const textures = useLoader(TextureLoader, [assetUrl(`assets/${id}-front.webp`), assetUrl(`assets/${id}-back.webp`), assetUrl(`assets/${id}-spine.webp`)]);
  textures.forEach(t => {t.colorSpace = SRGBColorSpace;});
  const group = useRef<Mesh>(null);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  useFrame(({pointer}, delta) => { if (!reduced && group.current) {group.current.rotation.y += (pointer.x * .12 - group.current.rotation.y) * Math.min(delta * 3, 1); group.current.rotation.x += (-pointer.y * .05 - group.current.rotation.x) * Math.min(delta * 3, 1);} });
  return <mesh ref={group}><boxGeometry args={[2, 2.75, DEPTH]}/>
    <meshStandardMaterial attach="material-0" color="#e6dec9" roughness={.95}/>
    <meshStandardMaterial attach="material-1" map={textures[2]} roughness={.7}/>
    <meshStandardMaterial attach="material-2" color="#e6dec9" roughness={.95}/>
    <meshStandardMaterial attach="material-3" color="#e6dec9" roughness={.95}/>
    <meshStandardMaterial attach="material-4" map={textures[0]} roughness={.7}/>
    <meshStandardMaterial attach="material-5" map={textures[1]} roughness={.7}/>
  </mesh>;
}
export default function BookScene({id,onError}: {id:BookId;onError:()=>void}) {
  return <SceneBoundary onError={onError}><Canvas dpr={[1,1.5]} camera={{position:[0,0,4.6],fov:43}} gl={{alpha:true,antialias:true}} fallback={<p>The original cover is available using Return to cover.</p>} aria-label="Interactive book. Drag to rotate; use the return button to close.">
    <ambientLight intensity={1.8}/><directionalLight position={[3,4,5]} intensity={2.6}/><directionalLight position={[-4,1,1]} intensity={1}/>
    <Suspense fallback={null}><Model id={id}/></Suspense><OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.2} maxPolarAngle={1.9} enableDamping />
  </Canvas></SceneBoundary>;
}
