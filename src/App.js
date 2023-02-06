import Navigation from "./components/Navigation";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Favorite from "./components/Favorite";
import Cart from "./components/Cart";
import { useState, useEffect } from "react";
import Menu from "./components/Menu";
import SneakerList from "./components/SneakerList";
import SneakerDetail from "./components/SneakerDetail";
import SignUp from "./components/forms/SignUp";
import LogIn from "./components/forms/LogIn";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLogged, setIsLogged] = useState(
    () => !!JSON.parse(localStorage.getItem("isLogged"))
  );
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = window.location.pathname;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLogged));
  }, [isLogged]);

  const handleSelectOptionChange = (e) => {
    !selectedOption ? setSelectedOption(e.value) : setSelectedOption(null);
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

    if (pathname !== '/women' && pathname !== '/men' && pathname !== '/child' !== '/') {
      navigate('/');
    }
  }

  const handleLinkOpenClick = () => {
    setQuery("");
    setInputValue('');
    setSelectedOption('');
  }

  return (
    <>
      <Menu
        handleMenuCloseClick={handleMenuCloseClick}
        handleLinkOpenClick={handleLinkOpenClick}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        isMenuOpen={isMenuOpen}
      />
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
          handleLinkOpenClick={handleLinkOpenClick}
        />
        <Routes>
          {['/', '/men', '/women', '/child'].map(path => <Route
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
            element={<LogIn
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              userName={userName}
              setUserName={setUserName}
            />}
          />
          <Route
            path='/signUp'
            element={< SignUp
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              userName={userName}
              setUserName={setUserName}
            />}
          />
          <Route
            path='/:id'
            element={<SneakerDetail />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
