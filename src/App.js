import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Favorite from "./components/Favorite";
import Cart from "./components/Cart";
import { useState } from "react";
import Menu from "./components/Menu";
import SneakerList from "./components/SneakerList";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpenClick = () => {
    setIsMenuOpen(true);
  }

  const handleMenuCloseClick = () => {
    isMenuOpen && setIsMenuOpen(false);
  }

  return (
    <div onClick={handleMenuCloseClick} className={`container ${isMenuOpen && `container--blurred`} `}>
      <Navigation handleMenuOpenClick={handleMenuOpenClick} handleMenuCloseClick={handleMenuCloseClick} isMenuOpen={isMenuOpen} />
      {isMenuOpen && <Menu handleMenuCloseClick={handleMenuCloseClick} />}
      <SneakerList />
      <Routes>
        <Route
          path='/favorite'
          element={<Favorite />}
        />
        <Route
          path='/cart'
          element={<Cart />}
        />
      </Routes>
    </div>
  );
}

export default App;
