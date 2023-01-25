import styles from './Menu.module.css'

const Menu = ({ handleMenuCloseClick }) => {
   return (
      <div className={styles.menu}>
         <svg onClick={handleMenuCloseClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" /></svg>
         <div className={styles.menuContainer}>
            <div className={styles.menuLinks}>
               <p>New</p>
               <p>Men</p>
               <p>Women</p>
               <p>Kids</p>
               <p>Sale</p>
            </div>

            <div className={styles.menuBtns}>
               <button className={styles.btnSignUp}>Sign Up</button>
               <button>Log In</button>
            </div>
         </div>
      </div>
   );
}

export default Menu;