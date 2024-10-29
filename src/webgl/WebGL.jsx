import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import * as THREE from 'three'
import { Suspense, useRef } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Bloom } from '@react-three/postprocessing'

function TronGrid() {
    const gridRef = useRef()
}

function WebGL({ disableWebgl }) {
    return (
        <div
            className="overlay"
            onClick={disableWebgl}
        >
            <div className="webgl-screen">
                <Canvas
                    gl={{
                        toneMapping: THREE.ACESFilmicToneMapping,
                        outputColorSpace: THREE.LinearDisplayP3ColorSpace,
                    }}
                    camera={{
                        position: [0, 18, 25],
                    }}
                >
                    <Environment
                        background={false}
                        preset="sunset"
                    />
                    <OrbitControls
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2.8}
                        maxDistance={40}
                        minDistance={15}
                        enableDamping
                        dampingFactor={0.03}
                        rotateSpeed={0.3}
                    />
                    {/* <primitive
                        object={
                            new THREE.GridHelper(10, 10, 0xffffff, 0xffffff)
                        }
                    /> */}
                    <color
                        args={['#241a1a']}
                        // args={['#000']}
                        attach="background"
                    />
                    {/* <ambientLight intensity={0.5} /> */}

                    {/* <Effects>
                        <Bloom
                            luminanceThreshold={0}
                            luminanceSmoothing={0.9}
                            height={300}
                        />
                    </Effects> */}

                    <Suspense>
                        <Experience />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}

export default WebGL
