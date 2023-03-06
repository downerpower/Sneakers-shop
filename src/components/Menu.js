import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = ({ handleMenuCloseClick, handleLinkOpenClick, isLogged, setIsLogged, isMenuOpen }) => {
   return (
      <div className={`${isMenuOpen ? styles.menu : styles.menuClose} `}>
         <svg className={styles.iconClose} onClick={handleMenuCloseClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
         <div className={styles.menuContainer}>
            <div className={styles.menuLinks}>
               <Link to='/' onClick={handleLinkOpenClick}>
                  <p>All</p>
               </Link>

               <Link to='/men' onClick={handleLinkOpenClick}>
                  <p>Men</p>
               </Link>

               <Link to='/women' onClick={handleLinkOpenClick}>
                  <p>Women</p>
               </Link>

               <Link to='/child' onClick={handleLinkOpenClick}>
                  <p>Kids</p>
               </Link>
            </div>

            {!isLogged ? <div className={styles.menuBtns}>
               <Link to='/logIn'>
                  <button className={styles.btnLogIn}>Log in</button>
               </Link>
               <Link to='/signUp'>
                  <button className={styles.btnSignUp} >Sign up</button>
               </Link>
            </div> :
               <div className={styles.menuBtns}>
                  <button className={styles.btnLogIn} onClick={() => setIsLogged(false)}>Sign out</button>
               </div>
            }
         </div>
      </div>
   );
}

export default Menu;