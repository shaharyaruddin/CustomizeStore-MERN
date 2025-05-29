import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Canvas from "./canvas/index";
import Cart from "./pages/Cart";
import Customizer from "./pages/Customizer";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import Home from "./pages/Home";
import ShopNow from './pages/ShopNow';

// Helper component to conditionally render layout
const MainLayout = () => {
  return (
    <>
      <Home />
      <Customizer />
      <Canvas />
      <Hero />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
      <Footer />

    </Router>
  );
}

const AppContent = () => {

  return (
    <>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop-now" element={<ShopNow />} />

        <Route path="*" element={<MainLayout />} />
      </Routes>
    </>
  );
};

export default App;
