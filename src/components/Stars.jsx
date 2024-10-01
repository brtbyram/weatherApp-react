import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'


function Stars(props) {
    const points = useRef()
    const sphere = random.inSphere(new Float32Array(5000), { radius: 5.4 })

    useFrame((state, delta) => {
        points.current.rotation.y -= delta / 50
        points.current.rotation.x -= delta / 50
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={points} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial transparent color="#f272c8" size={0.003} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

export default function StarsCanvas() {

    return (
        <div className="w-full h-full bg-black absolute inset-0">
            <Canvas camera={{ posiion: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}
