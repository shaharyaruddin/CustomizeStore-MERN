import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { div } from "three/examples/jsm/nodes/Nodes.js";

const CanvasModel = () => {
  return (
  <Canvas
  shadows
  style={{  width: '100vw', height: '100vh' }}
  camera={{ position: [0, 0, 0], fov: 25 }}
  gl={{ preserveDrawingBuffer: true }}
>

      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
