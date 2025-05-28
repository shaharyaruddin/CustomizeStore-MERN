import Canvas from "./canvas/index";
import Customizer from "./pages/Customizer";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home />
      <Customizer />
      <Canvas />
      <Hero />
      <Footer/>
    </>
  );
}

export default App;
