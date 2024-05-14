// examples https://analyticphysics.com/Higher%20Dimensions/Visualizing%20Calabi-Yau%20Manifolds.htm
// https://observablehq.com/@sw1227/calabi-yau-manifold-3d

// buffer geometry https://codesandbox.io/p/sandbox/points-ldpyw8?file=%2Fsrc%2Findex.js%3A20%2C26-20%2C56
// https://stackoverflow.com/questions/67555786/custom-buffergeometry-in-react-three-fiber
// in the example for "attach" https://docs.pmnd.rs/react-three-fiber/api/objects#attach
// https://threejs.org/docs/?q=buffer#api/en/core/BufferGeometry
// all examples https://docs.pmnd.rs/react-three-fiber/getting-started/examples
// compute normals https://stackoverflow.com/questions/67753315/buffergeometry-normals-react-three-fiber
// camera movement example https://codesandbox.io/p/sandbox/viking-ship-0buje?file=%2Fsrc%2FApp.tsx
// bloom from selection and pallette https://codesandbox.io/p/sandbox/instanced-vertex-colors-8fo01?file=%2Fsrc%2FApp.js

import React, { useRef, useState, useEffect, useTransition, useMemo } from 'react'
import Layout from "../components/layout"
import { SEO } from "../components/seo"
//import { addCalabiYau } from "../components/calabi/calabi"

import { BufferAttribute, DoubleSide } from "three";
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, AccumulativeShadows, RandomizedLight, Environment, OrbitControls, CameraControls } from "@react-three/drei";

import * as math from 'mathjs';

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  // const [hovered, hover] = useState(false)
  // const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color='orange' />
    </mesh>
  )
}

function BufferGeometryTest({ count = 1000 }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * 20);
    return new BufferAttribute(new Float32Array(p), 3);
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        threshold={0.1}
        color={0xff00ff}
        sizeAttenuation={true}
      />
    </points>
  );
}

function BufferGeometryTest2() {
  const points = useMemo(() => {
    const n = 8;
    const a = 2.0;
    const PI_2 = Math.PI / 2;
    const dx = math.pi / 10;
    const dy = math.pi / 10;
    let vertices = [];

    function coordinate(x, y, n, k1, k2, a) {
      const z1 = math.multiply(
        math.exp(math.complex(0, 2 * math.pi * k1 / n)),
        math.pow(math.cos(math.complex(x, y)), 2 / n)
      );
      const z2 = math.multiply(
        math.exp(math.complex(0, 2 * math.pi * k2 / n)),
        math.pow(math.sin(math.complex(x, y)), 2 / n)
      );
      return [
        z1.re, 
        z2.re, 
        z1.im * math.cos(a) + z2.im * math.sin(a)
      ];
    }

    
    for (let k1 = 0; k1 < n; ++k1) {
      for (let k2 = 0; k2 < n; ++k2) {
        for (let x = 0; x <= PI_2; x += dx) {
          for (let y = -PI_2; y < PI_2; y += dy) {
            vertices = vertices.concat(
              coordinate(x, y, n, k1, k2, a),
              coordinate(x + dx, y, n, k1, k2, a),
              coordinate(x + dx, y + dy, n, k1, k2, a),
              coordinate(x, y + dy, n, k1, k2, a)
            );
          }
        }
      }
    }
    return new BufferAttribute(new Float32Array(vertices), 3);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        threshold={0.1}
        color={0xff00ff}
        sizeAttenuation={true}
      />
    </points>
  );
}

function coordinate(x, y, n, k1, k2, a) {
  const z1 = math.multiply(
    math.exp(math.complex(0, 2 * Math.PI * k1 / n)),
    math.pow(math.cos(math.complex(x, y)), 2 / n)
  );
  const z2 = math.multiply(
    math.exp(math.complex(0, 2 * Math.PI * k2 / n)),
    math.pow(math.sin(math.complex(x, y)), 2 / n)
  );
  return [
    z1.re, 
    z2.re, 
    z1.im * math.cos(a) + z2.im * math.sin(a)
  ];
}

function BufferGeometryTest3() {
  const ref = useRef();
  
  const [points, indices] = useMemo(() => {
    const n = 6;
    const a = 2.0;
    const PI_2 = Math.PI / 2;
    const dx = PI_2 / 5;
    const dy = PI_2 / 5;
    let ids = [];
    let vertices = [];
    let i = 0;
    for (let k1 = 0; k1 < n; ++k1) {
      for (let k2 = 0; k2 < n; ++k2) {
        for (let x = 0; x <= PI_2; x += dx) {
          for (let y = -PI_2; y < PI_2; y += dy) {
            ids = ids.concat([
              i+0, i+1, i+2,
              i+2, i+3, i+0
            ]);
            i += 4;
            vertices = vertices.concat(
              coordinate(x, y, n, k1, k2, a),
              coordinate(x + dx, y, n, k1, k2, a),
              coordinate(x + dx, y + dy, n, k1, k2, a),
              coordinate(x, y + dy, n, k1, k2, a)
            );
          }
        }
      }
    }
    return [new Float32Array(vertices), new Uint16Array(ids)];
  });

  return (
    <mesh castShadow position={[0, 1.4, 0]}>
      <bufferGeometry ref={ref} onUpdate={self => self.computeVertexNormals()}>
        <bufferAttribute 
          attach='attributes-position'
          array={points}
          count={points.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        />
      </bufferGeometry>
      <meshPhongMaterial 
        side={DoubleSide}
        color={0x374A67}
        specular={0xCB9CF2}
        
      />
      {/* <meshStandardMaterial 
        color='orange'
        side={DoubleSide}
        metalness={0.8}
        roughness={0.7}
      /> */}
    </mesh>
  );
}

function Env() {
  const preset = 'sunset';
  const blur = 0.9;
    
  return <Environment preset={preset} background backgroundBlurriness={blur} />
}

// const dimensions = {
//   width: 960,
//   height: 600,
//   margin: { top: 30, right: 60, bottom: 30, left: 60 }
// };

function CustomCameraControls(){
  const cameraControlsRef = useRef();

  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    
    cameraControlsRef.current?.moveTo(
      Math.sin(t / 2.0) / 1.0, 
      (Math.sin(t / 4.0) + 1.0) / 4.0 + 0.5,
      Math.cos(t / 2.0) / 1.0, 
      false
    )

    cameraControlsRef.current?.lookInDirectionOf(0, 0.7, 0, false)
  });
  useEffect(() => {
    cameraControlsRef.current?.lookInDirectionOf(-15, 0, -1, false)
  });
  

  return (
    <CameraControls
      enabled={true}
      ref={cameraControlsRef}
    />
  )
}

const CalabiManifold = () => {
  return (<Layout
    title="Calabi Manifold"
    section="science"
  >
    {/* <svg ref={svgRef} width={svgWidth} height={svgHeight} /> */}
    {/* <div className="Cube-container" ref={containerRef}></div> */}
    <div style={{width:"800px", height:"500px"}}>
      <Canvas camera={{ fov: 25, near: 1, far: 1000, position: [5, 7, 0] }} >
        <ambientLight intensity={1.0} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <group position={[0, -0.45, 0]}>
          <BufferGeometryTest3 />
          <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
            <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
          </AccumulativeShadows>
        </group>
        
        <Env />
        <CustomCameraControls
        />
        
      </Canvas>
    </div>

  </Layout>)
}

export default CalabiManifold

export const Head = ({ location, data, pageContext }) => (
  <SEO
    path={location.pathname}
    data={data}
    frontmatter={data?.markdownRemark?.frontmatter}
    pageContext={pageContext}
    title="Calabi Manifold"
  >

  </SEO>
)