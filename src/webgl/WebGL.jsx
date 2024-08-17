import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import * as THREE from 'three'

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
                        position: [15, 15, 3],
                    }}
                >
                    <color
                        args={['#241a1a']}
                        attach="background"
                    />
                    <ambientLight intensity={0.5} />
                    <Experience />
                </Canvas>
            </div>
        </div>
    )
}

export default WebGL
