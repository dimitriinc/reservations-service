import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Experience() {
    const cactusRef = useRef()
    const { scene } = useGLTF('/models/barScene.glb')
    useFrame((state, delta) => {
        // cactusRef.current.rotation.y += delta
    })
    return (
        <>
            {/* <Environment
                background
                files={'/textures/EveningSky.exr'}
            /> */}
            <OrbitControls />
            <primitive
                ref={cactusRef}
                object={scene}
                // position={ [0, -2, 0] }
            />
        </>
    )
}
