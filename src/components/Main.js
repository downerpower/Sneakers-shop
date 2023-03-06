import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./Main.module.css";

const Main = () => {
  const [isMainHidden, setIsMainHidden] = useState(false);

  const pathname = window.location.pathname;

  useEffect(() => {
    if (
      pathname !== "/" &&
      pathname !== "/women" &&
      pathname !== "/men" &&
      pathname !== "/child"
    ) {
      setIsMainHidden(true);
    }
  }, [pathname]);

  const handleMainCloseClick = () => {
   setIsMainHidden(true);
 };

  return (
    <>
      {!isMainHidden && (
        <motion.div
          className={styles.mainContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          <svg
            className={styles.mainBtnClose}
            onClick={handleMainCloseClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
              fill="rgba(0,0,0,0.41)"
            />
          </svg>
          <div className={styles.mainContent}>
            <div>
              <p>Shop for comfort</p>
              <p>Make your feet happy.</p>
            </div>
            <div className={styles.mainBtns}>
              <Link to="/logIn">
                <button className={styles.btnLogIn}>Log in</button>
              </Link>
              <Link to="/signUp">
                <button className={styles.btnSignUp}>Sign up</button>
              </Link>
            </div>
          </div>
          <img src="./img/converse.png" alt="converse" />
        </motion.div>
      )}
    </>
  );
};

export default Main;
