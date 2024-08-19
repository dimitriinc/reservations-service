import {
    useGLTF,
    OrbitControls,
    Environment,
    useTexture,
} from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Experience() {
    const tableRef = useRef()
    const { nodes } = useGLTF('/models/table.glb')

    const bakedTexture = useTexture('./textures/table.jpg')
    bakedTexture.flipY = false

    useEffect(() => {
        // console.log(nodes)
    }, [])
    useFrame((state, delta) => {
        tableRef.current.rotation.y += delta
    })
    return (
        <>
            {/* <Environment
                background
                files={'/textures/EveningSky.exr'}
            /> */}
            <OrbitControls />
           
            <mesh geometry={nodes.table.geometry} ref={tableRef}>
                {/* <meshStandardMaterial color={'#ff00aa'} /> */}
                <meshBasicMaterial map={bakedTexture} />
            </mesh>
     
        </>
    )
}
