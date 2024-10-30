import { Color } from 'three'
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'

export const GradientMaterial = shaderMaterial(
    { color: new Color(0x983B16), opacity: 1 },
    `
    varying vec3 vPosition;
    
    void main() {
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    `
    uniform vec3 color;
    uniform float opacity;
    varying vec3 vPosition;
  
    void main() {
      float alpha = smoothstep(0.0, 1.0, vPosition.y);
      gl_FragColor = vec4(color, alpha * opacity);
    }
    `
)

extend({ GradientMaterial })

