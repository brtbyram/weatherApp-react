import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function SkyBox(props) {
    const { nodes, materials } = useGLTF('/billions_stars_skybox_hdri_panorama.glb')
    useFrame(({ camera }) => {
        camera.rotation.x += 0.0001
        camera.rotation.y += 0.0001
    })
    return (
        <group {...props} dispose={null} >
            <mesh
                castShadow // gölge oluşturur
                receiveShadow // gölgeyi alır
                geometry={nodes.Object_4.geometry} // geometriyi alır. 
                material={materials.material}
                rotation={[Math.PI / 2, 0, 0]} // bu yönü değiştirerek farklı bir açıda görebilirsiniz. 
                position={[0, 0, 4]} // bu konumu değiştirerek farklı bir konumda görebilirsiniz.
            />
        </group>
    )
}

useGLTF.preload('/billions_stars_skybox_hdri_panorama.glb')