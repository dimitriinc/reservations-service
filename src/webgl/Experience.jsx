import { useGLTF, useTexture, useProgress } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { DoubleSide } from 'three'

export default function Experience({onProgressChange}) {

    const {progress} = useProgress()
    onProgressChange(progress)
    
    const sceneRef = useRef()
    const baked = useGLTF('/models/baked.glb')
    const normal = useGLTF('/models/normal.glb')

    const baseTexture = useTexture('./textures/base.jpg')
    baseTexture.flipY = false
    const promoTexture = useTexture('./textures/promo.jpg')
    promoTexture.flipY = false

    // useEffect(() => {
    //     onProgressChange(progress)
    // }, [progress])

    return (
        <>
            {/* <PresentationControls
                global
                cursor={false}
                zoom={0.8}
                config={{
                    mass: 4,
                    tension: 100,
                }}
            > */}
            <group
                ref={sceneRef}
                position={[0, 0, -8]}
                rotation-y={-Math.PI / 2.5}
            >
                <mesh
                    geometry={baked.nodes.base020.geometry}
                    position={baked.nodes.base020.position}
                    rotation={baked.nodes.base020.rotation}
                >
                    <meshBasicMaterial map={baseTexture} />
                </mesh>
                <mesh
                    geometry={baked.nodes.promoBooth.geometry}
                    position={baked.nodes.promoBooth.position}
                    rotation={baked.nodes.promoBooth.rotation}
                >
                    <meshBasicMaterial map={promoTexture} />
                </mesh>

                {Object.values(normal.nodes).map((node) => {
                    if (node.name.startsWith('emissive')) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                            >
                                <meshBasicMaterial color={'#ffffe5'} />
                            </mesh>
                        )
                    }

                    if (node.name.startsWith('glass')) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                scale={node.scale}
                                key={node.name}
                            >
                                <meshPhysicalMaterial
                                    color="white"
                                    transmission={1} // For glass transparency
                                    opacity={0.5} // Adjust transparency level
                                    transparent={true} // Allow transparency
                                    roughness={0} // Smooth surface
                                    metalness={0.1} // Slight metallic sheen
                                    reflectivity={1} // Reflectivity for glass-like effect
                                    clearcoat={1} // Extra layer on top for shine
                                    clearcoatRoughness={0}
                                />
                            </mesh>
                        )
                    }

                    if (node.name === 'mirror') {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshPhysicalMaterial
                                    color="#fff"
                                    transmission={1} // For glass transparency
                                    opacity={0.9} // Adjust transparency level
                                    transparent={true} // Allow transparency
                                    roughness={0.9} // Smooth surface
                                    metalness={0.9} // Slight metallic sheen
                                    reflectivity={1} // Reflectivity for glass-like effect
                                    clearcoat={1} // Extra layer on top for shine
                                    clearcoatRoughness={0}
                                />
                            </mesh>
                        )
                    }

                    if (node.name === 'metal') {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshStandardMaterial
                                    metalness={0.5}
                                    roughness={0.2}
                                    color="gray"
                                />
                            </mesh>
                        )
                    }

                    if (node.name === 'black') {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshStandardMaterial
                                    metalness={0.6}
                                    roughness={0.9}
                                    color="#333"
                                />
                            </mesh>
                        )
                    }

                    if (node.name.startsWith('leaves')) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshStandardMaterial
                                    color={'#2f4c0d'}
                                    side={DoubleSide}
                                />
                            </mesh>
                        )
                    }

                    if (node.name.startsWith('trunk')) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshStandardMaterial
                                    color={'#2b1f09'}
                                    roughness={0.9}
                                    // side={DoubleSide}
                                />
                            </mesh>
                        )
                    }
                })}
            </group>
            {/* </PresentationControls> */}
        </>
    )
}
