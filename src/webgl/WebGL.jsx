import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import * as THREE from 'three'
import { useRef } from 'react'
import { Effects } from '@react-three/drei'
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
                        position: [0, 10, 10],
                    }}
                >
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
                    {/* <ambientLight intensity={2} /> */}

                    {/* <Effects>
                        <Bloom
                            // luminanceThreshold={0}
                            // luminanceSmoothing={0.9}
                            // height={300}
                        />
                    </Effects> */}

                    <Experience />
                </Canvas>
            </div>
        </div>
    )
}

export default WebGL
