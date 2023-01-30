import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import Favorite from "./components/Favorite";
import Cart from "./components/Cart";
import { useState } from "react";
import Menu from "./components/Menu";
import SneakerList from "./components/SneakerList";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectOptionChange = (e) => {
    setSelectedOption(e.value);
  }

  const handleMenuOpenClick = () => {
    setIsMenuOpen(true);
  }

  const handleMenuCloseClick = () => {
    isMenuOpen && setIsMenuOpen(false);
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    setInputValue('');
  }

  return (
    <>
      {isMenuOpen && <Menu handleMenuCloseClick={handleMenuCloseClick} />}
      <div onClick={handleMenuCloseClick} className={`container ${isMenuOpen && `container--blurred`} `}>
        <Navigation
          handleMenuOpenClick={handleMenuOpenClick}
          handleMenuCloseClick={handleMenuCloseClick}
          isMenuOpen={isMenuOpen}
          handleSearchSubmit={handleSearchSubmit}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleSelectOptionChange={handleSelectOptionChange}
          selectedOption={selectedOption}
        />
        <Routes>
          {['/home', '/new', '/men', '/women', '/child'].map(path => <Route
            key={path}
            exact path={path}
            element={
              <SneakerList
                query={query}
                selectedOption={selectedOption}
              />
            }
          />)}
          <Route
            path='/favorite'
            element={<Favorite />}
          />
          <Route
            path='/cart'
            element={<Cart />}
          />
          <Route
            path='/logIn'
            element={<LogIn />}
          />
          <Route
            path='/signUp'
            element={<SignUp />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
