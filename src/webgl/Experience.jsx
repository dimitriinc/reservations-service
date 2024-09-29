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
    const { nodes } = useGLTF('/models/cactusProbe.glb')
    const tree = useGLTF('/models/treeProbe.glb')
    const treeNodes = tree.nodes

    const probeTexture = useTexture('./textures/cactusProbe.jpg')
    probeTexture.flipY = false
    const treeTexture = useTexture('./textures/treeProbe.jpg')
    probeTexture.flipY = false

    useEffect(() => {
        console.log(nodes)
    }, [])

    useFrame((state, delta) => {
        sceneRef.current.rotation.y += delta / 4
    })

    return (
        <>
            {/* <Environment
                background
                files={'/textures/EveningSky.exr'}
            /> */}
            <OrbitControls />

            <group ref={sceneRef}>
                {/* <mesh
                    geometry={nodes.baseProbe.geometry}
                    position={nodes.baseProbe.position}
                >
                    <meshBasicMaterial map={probeTexture} />
                </mesh> */}
                {/* <mesh
                    geometry={nodes.cactus_3.geometry}
                    position={nodes.cactus_3.position}
                >
                    <meshBasicMaterial map={probeTexture} />
                </mesh> */}
                <mesh
                    geometry={treeNodes.plant_9.geometry}
                    position={treeNodes.plant_9.position}
                    rotation={treeNodes.plant_9.rotation}
                >
                    <meshBasicMaterial map={treeTexture} />
                </mesh>

                {Object.values(nodes).map((node) => {
                    if (node.name.startsWith('wallLight')) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                            >
                                <meshBasicMaterial color={'#ffffe5'} />
                            </mesh>
                        )
                    }

                    if (
                        node.name.startsWith('glass') &&
                        node.name !== 'glassVoid'
                    ) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                scale={node.scale}
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

                    if (node.name === 'glassVoid') {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
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

                {/* <mesh geometry={nodes.moneyTree.geometry} position={nodes.moneyTree.position}>
                    <meshBasicMaterial map={treeTexture} />
                </mesh> */}
                {/* <mesh geometry={nodes.chairs.geometry} position={nodes.chairs.position}>
                    <meshBasicMaterial map={chairsTexture} />
                </mesh> */}
            </group>
        </>
    )
}
