import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import * as THREE from 'three'
import { Suspense, useRef, useState } from 'react'
import { OrbitControls, Environment } from '@react-three/drei'
import { Bloom } from '@react-three/postprocessing'
import Loader from './Loader'

function TronGrid() {
    const gridRef = useRef()
}

function WebGL({ disableWebgl }) {
    const [isLoading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)

    function handleProgressChange(progress) {
        setProgress(progress)
    }

    return (
        <div
            className="overlay"
            onClick={disableWebgl}
        >
            <div className="webgl-screen">
                <Loader isLoading={isLoading} progress={progress} />
                <Canvas
                    className="canvas"
                    style={
                        isLoading
                            ? { visibility: 'hidden', opacity: '0' }
                            : { visibility: 'visible', opacity: '1' }
                    }
                    onCreated={() => {
                        setIsLoading(false)
                    }}
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
                        rotateSpeed={0.7}
                    />
                    <color
                        args={['#241a1a']}
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

                    {/* <Suspense fallback={<Loader />}> */}
                        <Experience onProgressChange={handleProgressChange} />
                    {/* </Suspense> */}
                </Canvas>
            </div>
        </div>
    )
}

export default WebGL
