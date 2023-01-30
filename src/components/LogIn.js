import { useState } from 'react';
import styles from './LogIn.module.css'
import { Link } from 'react-router-dom';

const LogIn = () => {
   const [isShown, setIsShown] = useState(false);

   const toggleShowPasswordClick = () => {
      setIsShown(prevValue => !prevValue)
   }

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <form className={styles.form}>
               <input type="email" placeholder='Email' />
               <div className={styles.password}>
                  <input
                     type={`${isShown ? 'text' : 'password'}`}
                     placeholder='Password'
                  />
                  {isShown ?
                     <svg onClick={toggleShowPasswordClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="rgba(149,149,149,1)" /></svg>
                     :
                     <svg onClick={toggleShowPasswordClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M9.342 18.782l-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l1.968-.359C3.903 10.812 7.579 14 12 14c4.42 0 8.097-3.188 8.856-7.39l1.968.358a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0l-.788 2.94z" fill="rgba(149,149,149,1)" /></svg>
                  }
               </div>
               <button className={styles.btn} type="submit">Log In</button>
               <span className={styles.info}>Don't have an account? <Link to='/signUp'>Sign up for free</Link></span>
            </form>
            <img className={styles.img} src="./sneaker.jpg" alt="sneaker" />
         </div>
      </div>
   );
}

export default LogIn;