import { useEffect, useRef, Suspense } from 'react'
import {Canvas, useThree, useFrame} from "@react-three/fiber"
import {OrbitControls, useGLTF, useAnimations, Environment} from "@react-three/drei"
import * as THREE from "three"
import './App.css'



const Guy = ()=>{
  const img = useGLTF("./elevatorguy.glb");
  const {mixer} = useAnimations(img.animations,img.scene);
  console.log(mixer)
  const guyRef = useRef()


  useFrame(()=>{

    setTimeout(()=>{
      guyRef.current.position.y -= .05;
      guyRef.current.position.z -= .01;
    },10500)
  })

 
  

  useEffect(()=>{
    // setTimeout(()=>{
          img.animations.forEach(clip=>{
            let action = mixer.clipAction(clip)
            action.setLoop(THREE.LoopOnce);
            action.play();
            
          })

        // },3000);
  },[])

  return (
    <group ref={guyRef }  position={[0,-3,1]} scale={.6} rotation={[0,0,0]}>
      <pointLight position={[-1,0,0]} intensity={1}/>
      <pointLight/>
      <pointLight position={[1,0,0]} intensity={1}/>
      <directionalLight position={[-1.2,1,-6]}/>
      <primitive object={img.scene}/>
    </group>
  )
}


const Store = ()=>{
  const img = useGLTF("./hopkintondrug.glb");



  return (
    <group position={[-.5,-3,1]} scale={[.5,1.4,.7]} rotation={[0,-Math.PI * .5,0]}>
      <pointLight position={[-1,0,0]} intensity={1}/>
      <pointLight/>
      <pointLight position={[1,0,0]} intensity={1}/>
      <directionalLight position={[-1.2,1,-6]}/>
      <primitive object={img.scene}/>
    </group>
  )
}


const Elevator = ()=>{
  const img = useGLTF("./elevator.glb");
  const {mixer} = useAnimations(img.animations,img.scene);
  console.log(mixer)
  

  useEffect(()=>{
    setTimeout(()=>{
          img.animations.forEach(clip=>{
            let action = mixer.clipAction(clip)
            action.setLoop(THREE.LoopOnce);
            action.play();
            
          })

        },3000);
  },[])


  return (
    <group position={[-4.15,-2,1.5]} scale={[.3,.4,.05]} rotation={[0,0,0]}>
      <pointLight position={[-1,0,0]} intensity={1}/>
      <pointLight/>
      <pointLight position={[1,0,0]} intensity={1}/>
      <directionalLight position={[-1.2,1,-6]}/>
      <primitive object={img.scene}/>
    </group>
  )
}

const Experience = ()=>{
    const {camera } = useThree();

    camera.position.x = -10;
    camera.position.z = 10;


    useFrame(()=>{
      console.log(camera.position.x)
      // while(camera.position.x < 0){
        if(camera.position.x < -1){
        camera.position.x+=.08
        camera.position.z-=.04
        camera.position.z += .01;
        console.log("animate")

       }
    })


  return (
    <group>
      <Elevator/>
      <Store/>
      <Guy/>
    </group>
  )
}

function App() {

  return (
    <Suspense fallback={()=><View><Text>Loading...</Text></View>}>
    <div className="app">
      <div className="text-overlay-container">
        <header>
        <div className="row">
        <h1 style={{"--i":"11s"}}>Happy</h1>
        <h1 style={{"--i":"12.5s"}}>29th</h1>
        </div>
        <h1 style={{"--i":"11.5s"}} className="shift-right">Birthday</h1>
        </header>
      </div>
      <Canvas>
           <color attach="background" args={["black"]}/>
           <ambientLight intensity={1}/>
           <Environment preset="city" background={false}/>
    

        
           <Experience/>
      </Canvas>
    </div>
    </Suspense>
  )
}

export default App
