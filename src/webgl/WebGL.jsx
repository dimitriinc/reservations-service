import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import * as THREE from 'three'
import { Suspense, useEffect, useRef, useState } from 'react'
import {
    OrbitControls,
    Environment,
    PresentationControls,
    Sky,
} from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import Loader from './Loader'
import { getDummyReservas } from '../utils'

function WebGL({ disableWebgl, date, part }) {
    const [isLoading, setIsLoading] = useState(true)
    const [dummyReservas, setDummyReservas] = useState([])

    const [controlsEnabled, setControlsEnabled] = useState(true)

    function handleControlsEnabled(enabled) {
        setControlsEnabled(enabled)
    }

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                const reservasString = await getDummyReservas(date, part)
                setDummyReservas(JSON.parse(reservasString))
            } catch (error) {
                console.log(error)
            }
        }
        fetchReservas()
    }, [])

    return (
        <div className="overlay">
            <div
                className="relative-screen"
                onClick={disableWebgl}
            >
                <div className="webgl-screen">
                    <div className="webgl-container">
                        <Loader isLoading={isLoading} />
                        {dummyReservas.length && (
                            <Canvas
                                className="canvas"
                                style={
                                    isLoading
                                        ? { visibility: 'hidden', opacity: '0' }
                                        : {
                                              visibility: 'visible',
                                              opacity: '1',
                                          }
                                }
                                onCreated={() => {
                                    setIsLoading(false)
                                }}
                                gl={{
                                    toneMapping: THREE.ACESFilmicToneMapping,
                                    outputColorSpace:
                                        THREE.LinearDisplayP3ColorSpace,
                                }}
                                camera={{
                                    position: [0, 18, 25],
                                }}
                            >
                                {/* <OrbitControls
                                    minPolarAngle={0}
                                    maxPolarAngle={Math.PI / 2.8}
                                    // maxDistance={40}
                                    // minDistance={15}
                                    enableDamping
                                    dampingFactor={0.03}
                                    rotateSpeed={0.7}
                                /> */}
                                <color
                                    args={['#0d1015']}
                                    attach="background"
                                />
                                <directionalLight
                                    position={[-10, 20, 4]}
                                    scale={[5, 5, 5]}
                                    intensity={0.25}
                                    color={new THREE.Color('#A8B4EB')}
                                />
                                <ambientLight intensity={0.05} color={new THREE.Color('#A8B4EB')}/>
                                {/* <Sky
                                    position={[0, 0, 0]}
                                    scale={[60, 60, 60]}
                                    distance={0}
                                    sunPosition={[0, 1, 0]} // Position of the sun
                                    turbidity={0.8} // Makes the sky appear more or less clear
                                    rayleigh={0.5} // Makes the sky more or less blue
                                    mieCoefficient={0.1} // Scattering factor, affects sky brightness
                                /> */}
                                <PresentationControls
                                    enabled={controlsEnabled}
                                    global
                                    cursor={false}
                                    zoom={0.8}
                                    config={{
                                        mass: 1,
                                        tension: 100,
                                    }}
                                >
                                    <Experience
                                        reservedTables={dummyReservas.map(
                                            (reserva) => reserva.table
                                        )}
                                        onControlsEnabled={
                                            handleControlsEnabled
                                        }
                                    />
                                </PresentationControls>
                            </Canvas>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WebGL
