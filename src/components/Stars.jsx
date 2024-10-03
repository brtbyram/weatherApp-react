import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Preload } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { SkyBox } from '../models/SkyBox'


function Stars(props) {
    const points = useRef()
    const sphere = random.inSphere(new Float32Array(15000),  // 5000 yıldız oluşturulur 
    { radius: 7.4 }) // bu yıldızlar küresel bir şekilde dağıtılır ve 5.4 birim yarıçapına sahiptir (5.4 birim yarıçapı, yıldızların kürenin içinde olmasını sağlar) 

    useFrame((state, delta) => {
        points.current.rotation.y -= delta / 50
        points.current.rotation.x -= delta / 50
    })

    return (
        <group className="relative">
            <Points ref={points} positions={sphere} stride={3} frustumCulled {...props}>
                <PointMaterial transparent color="#f272c8" size={0.005} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

export default function StarsCanvas() {

    return (
        <div className="w-full h-full bg-gradient-to-b from-[#020203] to-[#000000] absolute">
            <Canvas camera={{ posiion: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <SkyBox />
                    <Stars />
                </Suspense>
                <Preload all />
            </Canvas>
        </div>
    )
}
