import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { KeyboardControls } from '@react-three/drei'
// import Interface from './Interface.jsx'

function WebGL() {
    return (
        <div className="overlay">
            <div className="webgl-screen">
                {/* <KeyboardControls
                // map={[
                //     { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
                //     { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
                //     { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
                //     { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
                //     { name: 'jump', keys: ['Space'] },
                // ]}
                > */}
                <Canvas>
                    {/* <ambientLight intensity={0.5} /> */}
                </Canvas>
                {/*/ shadows
                    // camera={{
                    //     fov: 45,
                    //     near: 0.1,
                    //     far: 200,
                    //     position: [2.5, 4, 6],
                    // }}
                    >
                        <Experience />
                    </Canvas>
                    {/* <Interface /> */}
                {/* </KeyboardControls> */}
            </div>
        </div>
    )
}

export default WebGL
