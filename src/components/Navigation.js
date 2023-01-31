import { useSelector } from "react-redux";
import styles from './Navigation.module.css'
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Navigation = ({ handleMenuOpenClick, handleMenuCloseClick, isMenuOpen, handleSearchSubmit, inputValue, handleInputChange, handleSelectOptionChange, selectedOption, handleLinkOpenClick, setSelectedOption }) => {
   const options = [
      { value: 'asc', label: 'Price low to high' },
      { value: 'desc', label: 'Price high to low' }
   ]

   const favoriteItems = useSelector(state => state.favorites.value);
   const cartItems = useSelector(state => state.cart.value);

   return (
      <div className={styles.navigationContainer}>
         <div className={styles.navigationLeft}>
            {!isMenuOpen ?
               <svg onClick={handleMenuOpenClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" /></svg>
               :
               <svg onClick={handleMenuCloseClick} className={styles.iconOpen} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" fill="rgba(169,167,167,1)" /></svg>
            }
            <Link to='/'>
               <div>
                  <img src='./logo.png' alt='logo' />
               </div>
            </Link>
         </div>
         <div className={styles.navigationRight}>
            <Select
               placeholder='Sort'
               options={options}
               onChange={handleSelectOptionChange}
               defaultValue={selectedOption}
               isClearable={true}
               className='react-select-container'
               classNamePrefix='react-select'
               theme={(theme) => ({
                  ...theme,
                  colors: {
                     ...theme.colors,
                     text: 'orangered',
                     primary25: '#ededed',
                     primary: 'black',
                  },
               })}
            />
            <form className={styles.navigationForm} onSubmit={handleSearchSubmit}>
               <button type='submit' className={styles.navigationSearchBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" /></svg>
               </button>
               <input
                  type="text"
                  name="query"
                  value={inputValue}
                  onChange={handleInputChange}
                  className={styles.navigationInput}
                  placeholder="Search"
               />
               {inputValue &&
                  <svg className={styles.btnDelete} onClick={handleLinkOpenClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
               }
            </form>
            <Link to='/favorite' onClick={handleLinkOpenClick}>
               {favoriteItems.length > 0 ?
                  <svg className={styles.iconFull} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z" /><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" /></svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0H24V24H0z" /><path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" /></svg>
               }
            </Link>
            <Link to='/cart' onClick={handleLinkOpenClick}>
               {cartItems.length === 0 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg>}
               {cartItems.length !== 0 && <svg className={styles.iconFull} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M6 9h13.938l.5-2H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1V4H2V2h3a1 1 0 0 1 1 1v6zm0 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /></svg>}
            </Link>
         </div>
      </div >
   );
}

export default Navigation;