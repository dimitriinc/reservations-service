import {
    useGLTF,
    OrbitControls,
    Environment,
    useTexture,
} from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshPhysicalMaterial } from 'three'

export default function Experience() {
    const sceneRef = useRef()
    const { nodes } = useGLTF('/models/master.glb')

    const baseTexture = useTexture('./textures/base.jpg')
    baseTexture.flipY = false

    useEffect(() => {
        // console.log(nodes)
    }, [])

    // useFrame((state, delta) => {
    //     sceneRef.current.rotation.y += delta / 4
    // })

    return (
        <>
            {/* <Environment
                background
                files={'/textures/EveningSky.exr'}
            /> */}
            <OrbitControls />

            <group ref={sceneRef}>
                <mesh
                    geometry={nodes.base020.geometry}
                    position={nodes.base020.position}
                    rotation={nodes.base020.rotation}
                >
                    <meshBasicMaterial map={baseTexture} />
                </mesh>

                {Object.values(nodes).map((node) => {
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

                    if (
                        node.name.startsWith('glass')
                    ) {
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
                                    color="white"
                                    transmission={1} // For glass transparency
                                    opacity={0.7} // Adjust transparency level
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
                })}
            </group>
        </>
    )
}
