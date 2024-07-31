import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import 'aframe'

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <>
      <a-scene
        networked-scene="
      room: 360;
      debug: true;
      adapter: wseasyrtc;
    "
        renderer="physicallyCorrectLights: true;">
        <a-assets>
          <template id="avatar-template">
            <a-entity class="avatar">
              <a-sphere class="head" scale="0.45 0.5 0.4"></a-sphere>
              <a-entity class="face" position="0 0.05 0">
                <a-sphere class="eye" color="#efefef" position="0.16 0.1 -0.35" scale="0.12 0.12 0.12">
                  <a-sphere class="pupil" color="#000" position="0 0 -1" scale="0.2 0.2 0.2"></a-sphere>
                </a-sphere>
                <a-sphere class="eye" color="#efefef" position="-0.16 0.1 -0.35" scale="0.12 0.12 0.12">
                  <a-sphere class="pupil" color="#000" position="0 0 -1" scale="0.2 0.2 0.2"></a-sphere>
                </a-sphere>
              </a-entity>
            </a-entity>
          </template>
        </a-assets>
        <a-entity id="rig">
          <a-entity
            id="player"
            networked="template:#avatar-template;attachTemplateToLocal:false;"
            camera
            position="0 1.6 0"
            spawn-in-circle="radius:3"
            wasd-controls
            look-controls>
            <a-sphere class="head" visible="false" random-color></a-sphere>
          </a-entity>
        </a-entity>
        <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
        <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
        <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
        <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
        <a-sky src="/img/puydesancy.jpg" rotation="0 -130 0"></a-sky>
      </a-scene>
    </>
  )
}
