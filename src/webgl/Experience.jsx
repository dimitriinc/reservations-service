import { Effects, useGLTF, useTexture, useProgress } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { DoubleSide } from 'three'
import { colors } from './leafColors'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

// function getRandomLeafGreen() {
//     // Lower green range and adjust other values for natural, muted green shades.
//     const r = Math.floor(30 + Math.random() * 40) // Red: low and close to blue
//     const g = Math.floor(80 + Math.random() * 70) // Green: moderate but not too bright
//     const b = Math.floor(30 + Math.random() * 40) // Blue: low and close to red

//     // Convert to hex and ensure two-digit formatting
//     return `#${r.toString(16).padStart(2, '0')}${g
//         .toString(16)
//         .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
// }

function getRandomLeafColor(colors) {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}

export default function Experience({ onProgressChange }) {
    const { progress } = useProgress()

    const sceneRef = useRef()
    const baked = useGLTF('/models/baked.glb')
    const normal = useGLTF('/models/normal.glb')
    const tables = useGLTF('/models/tables.glb')

    const baseTexture = useTexture('./textures/base.jpg')
    baseTexture.flipY = false
    const promoTexture = useTexture('./textures/promo.jpg')
    promoTexture.flipY = false
    const bottlesTexture = useTexture('./textures/bottles.jpg')
    bottlesTexture.flipY = false
    const tablesTexture = useTexture('./textures/tables.jpg')
    tablesTexture.flipY = false
    const tablesRoughnessTexture = useTexture('./textures/tablesRoughness.jpg')
    tablesTexture.flipY = false
    const tablesNormalTexture = useTexture('./textures/tablesNormal.jpg')
    tablesTexture.flipY = false
    const alphaMap = useTexture('./textures/alpha.png')

    useEffect(() => {
        onProgressChange(progress)
    }, [progress])

    function handleTableClick(event) {
        // console.log(event)
        // alert(`Mesa ${event.target.userData.number}`)
    }

    return (
        <>
            <group
                ref={sceneRef}
                position={[0, 0, -8]}
                rotation-y={-Math.PI / 2.5}
            >
                <mesh
                    geometry={baked.nodes.master.geometry}
                    position={baked.nodes.master.position}
                    rotation={baked.nodes.master.rotation}
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
                <mesh
                    geometry={baked.nodes.bottles.geometry}
                    position={baked.nodes.bottles.position}
                    rotation={baked.nodes.bottles.rotation}
                >
                    <meshBasicMaterial map={bottlesTexture} />
                </mesh>

                {Object.values(tables.nodes).map((node) => {
                    if (node.name.startsWith('tableRoundTop')) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                scale={node.scale}
                                key={node.name}
                                onClick={() => alert(`Mesa ${node.userData.number}`)}
                                onPointerEnter={() =>
                                    (document.body.style.cursor = 'pointer')
                                }
                                onPointerLeave={() =>
                                    (document.body.style.cursor = 'default')
                                }
                            >
                                <meshPhysicalMaterial
                                    depthWrite={false}
                                    color="#aaa"
                                    transmission={1}
                                    opacity={0.6}
                                    transparent={true}
                                    roughness={0.2}
                                    metalness={0.1}
                                    reflectivity={1}
                                    clearcoat={1}
                                    clearcoatRoughness={0}
                                />
                            </mesh>
                        )
                    } else {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                scale={node.scale}
                                key={node.name}
                                onClick={() => alert(`Mesa ${node.userData.number}`)}
                                onPointerEnter={() =>
                                    (document.body.style.cursor = 'pointer')
                                }
                                onPointerLeave={() =>
                                    (document.body.style.cursor = 'default')
                                }
                            >
                                <meshBasicMaterial
                                    map={tablesTexture}
                                    roughness={tablesRoughnessTexture}
                                    normal={tablesNormalTexture}
                                />
                            </mesh>
                        )
                    }
                })}

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
                                    depthWrite={false}
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
                                    // depthWrite={false}
                                    color="#fff"
                                    transmission={1} // For glass transparency
                                    opacity={0.9} // Adjust transparency level
                                    transparent={true} // Allow transparency
                                    roughness={0.9} // Smooth surface
                                    metalness={0.1} // Slight metallic sheen
                                    reflectivity={1} // Reflectivity for glass-like effect
                                    clearcoat={1} // Extra layer on top for shine
                                    clearcoatRoughness={0}
                                />
                            </mesh>
                        )
                    }

                    if (node.name === 'whiteMetal') {
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
                                    color="#ddd"
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
                                    color={getRandomLeafColor(colors)}
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
                                    color={'#554c3a'}
                                    roughness={0.9}
                                    side={DoubleSide}
                                />
                            </mesh>
                        )
                    }

                    if (node.name.startsWith('column')) {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                {/* <primitive attach='material' object={new GradientMaterial()}/> */}
                                <meshStandardMaterial
                                    depthWrite={false}
                                    color={'#983B16'}
                                    roughness={0.9}
                                    transparent={true}
                                    alphaMap={alphaMap}
                                />
                            </mesh>
                        )
                    }

                    if (node.name === 'toldoBase') {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshStandardMaterial
                                    depthWrite={false}
                                    color={'#983B16'}
                                    roughness={0.9}
                                    transparent={true}
                                    opacity={0.2}
                                />
                            </mesh>
                        )
                    }

                    if (node.name === 'toldoRoof') {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshStandardMaterial
                                    depthWrite={false}
                                    color={'#bbb'}
                                    roughness={0.9}
                                    side={DoubleSide}
                                    transparent={true}
                                    opacity={0.2}
                                />
                            </mesh>
                        )
                    }

                    if (node.name === 'cords') {
                        return (
                            <mesh
                                geometry={node.geometry}
                                position={node.position}
                                rotation={node.rotation}
                                key={node.name}
                                scale={node.scale}
                            >
                                <meshStandardMaterial
                                    depthWrite={false}
                                    color={'#333'}
                                    roughness={0.9}
                                    transparent={true}
                                    alphaMap={alphaMap}
                                />
                            </mesh>
                        )
                    }
                })}
            </group>
        </>
    )
}
