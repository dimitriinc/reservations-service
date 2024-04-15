import {
    PresentationControls,
    Float,
    Environment,
    useGLTF,
    ContactShadows,
    Html,
    Text,
} from '@react-three/drei'

export default function Experience() {
    // const computer = useGLTF(
    //     './master.glb'
    // )

    return (
        <>
            <Environment preset="city" />

            <color
                args={['#241a1a']}
                attach="background"
            />

            <PresentationControls
                rotation={[0.13, 0.1, 0]}
                global
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 4, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
            >
                <Float rotationIntensity={0.4}>
                    {/* <primitive object={computer.scene}></primitive> */}
                </Float>
            </PresentationControls>

            <ContactShadows
                position-y={-1.4}
                opacity={0.5}
                scale={5}
                blur={2.4}
            />
        </>
    )
}
