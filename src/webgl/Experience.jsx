import {
    useGLTF,
    OrbitControls,
    Environment,
    useTexture,
} from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Experience() {
    const sceneRef = useRef()
    const { nodes } = useGLTF('/models/table.glb')

    const tableTexture = useTexture('./textures/table.jpg')
    tableTexture.flipY = false
    const treeTexture = useTexture('./textures/moneyTree.jpg')
    treeTexture.flipY = false
    const chairsTexture = useTexture('./textures/chairs.jpg')
    chairsTexture.flipY = false

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
                <mesh geometry={nodes.table.geometry} position={nodes.table.position}>
                    <meshBasicMaterial map={tableTexture} />
                </mesh>
                <mesh geometry={nodes.moneyTree.geometry} position={nodes.moneyTree.position}>
                    <meshBasicMaterial map={treeTexture} />
                </mesh>
                {/* <mesh geometry={nodes.chairs.geometry} position={nodes.chairs.position}>
                    <meshBasicMaterial map={chairsTexture} />
                </mesh> */}
            </group>
        </>
    )
}
