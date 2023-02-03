import { useState, useEffect, useRef } from 'react';
import { Link, Navigate } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import { auth, googleProvider, firebase } from '../../firebase/base'
import { signInWithPopup } from "firebase/auth";

import styles from './AccountForm.module.css'

const AccountForm = ({ isLogged, setIsLogged, userName, setUserName, isSignUpForm }) => {
   const [isShown, setIsShown] = useState(false);
   const [showMessage, setShowMessage] = useState(false);
   const [isPasswordWrong, setIsPasswordWrong] = useState(false);
   const [isEmailWrong, setIsEmailWrong] = useState(false);

   const inputRef = useRef(null);

   useEffect(() => {
      if (isLogged) {
         setTimeout(() => {
            setShowMessage(true);

         }, 2000)
         setShowMessage(false);
      }
   }, [isLogged])

   const handleGoogleSignUp = () => {
      signInWithPopup(auth, googleProvider)
         .then((data) => {
            data && setIsLogged(true);
            data.user.displayName && setUserName(data.user.displayName);
         })

   }

   const toggleShowPasswordClick = () => {
      setIsShown(prevValue => !prevValue);

      setTimeout(function () {
         inputRef.current.focus();
         inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
      }, 0);
   }

   const validate = (value) => {
      let error;
      if (!value) {
         error = 'Required';
      } else if (value.length < 3) {
         error = 'Too short!';
      } else if (value.length > 20) {
         error = 'Too long!';
      }

      return error;
   }

   const validateEmail = (value) => {
      let error;
      if (!value) {
         error = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
         error = 'Invalid email address';
      }

      return error;
   }

   return (
      <>
         {!isLogged &&
            <div className={styles.container}>
               <div className={styles.wrapper}>
                  {isSignUpForm && <img src="./sneak-signup.jpg" alt="sneaker" className={styles.img} />}
                  <Formik
                     initialValues={isSignUpForm ? {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                     } :
                        {
                           email: '',
                           password: ''
                        }
                     }

                     onSubmit={(values, { resetForm }) => {
                        if (isSignUpForm) {
                           let url = 'https://sneakers-shop-8264b-default-rtdb.europe-west1.firebasedatabase.app/users.json'

                           fetch(url, {
                              method: 'POST',
                              body: JSON.stringify(values),
                              header: {
                                 'Content-Type': 'application/json'
                              }
                           })
                              .then(res => res.json())
                              .then(data => {
                                 data && setUserName(values.firstName);
                                 setIsLogged(true);
                              })
                        } else {
                           firebase
                              .app()
                              .database()
                              .ref("users")
                              .orderByChild("email")
                              .equalTo(values.email)
                              .once("value", snapshot => {
                                 const userData = snapshot.val();

                                 snapshot.forEach(function (childNodes) {
                                    setUserName(childNodes.val().firstName)
                                 })

                                 const flatUserData = JSON.stringify(userData)

                                 if (userData) {
                                    if (flatUserData.includes(values.password)) {
                                       console.log("user logged in!");
                                       setIsEmailWrong(false);
                                       setIsPasswordWrong(false);
                                       setIsLogged(true);
                                    } else {
                                       console.log('wrong password')
                                       setIsEmailWrong(false);
                                       setIsPasswordWrong(true);
                                       resetForm({
                                          values: {
                                             password: ''
                                          }
                                       });
                                    }

                                 } else {
                                    console.log("Email don't exist")
                                    setIsEmailWrong(true);
                                    setIsPasswordWrong(false);
                                    resetForm({ values: '' })
                                 }
                              });
                        }
                     }}

                  >
                     {({ errors, touched, validateForm }) => (
                        <Form className={styles.form}
                        >
                           {isSignUpForm && <div className={`${styles.inputField} ${(errors.firstName && touched.firstName) ? styles.errorField : undefined}`}>
                              <Field className={(errors.firstName && touched.firstName) ? styles.errorField : undefined} id="firstName" name="firstName" placeholder="First name" validate={validate} />
                           </div>
                           }
                           {errors.firstName && touched.firstName ? <div className={styles.error}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="rgba(255,26,64,1)" /></svg> {errors.firstName}</div> : null}

                           {isSignUpForm && <div className={`${styles.inputField} ${(errors.lastName && touched.lastName) ? styles.errorField : undefined}`}>
                              <Field className={(errors.lastName && touched.lastName) ? styles.errorField : undefined} id="lastName" name="lastName" placeholder="Last name" validate={validate} />
                           </div>}
                           {errors.lastName && touched.lastName ? <div className={styles.error}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="rgba(255,26,64,1)" /></svg> {errors.lastName}</div> : null}

                           {isEmailWrong && <div className={styles.error}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="rgba(255,26,64,1)" /></svg> We couldn't find your account</div>}
                           <div className={`${styles.inputField} ${(errors.email && touched.email) ? styles.errorField : undefined}`}>
                              <Field className={(errors.email && touched.email) ? styles.errorField : undefined} id="email" name="email" placeholder="Email" validate={validateEmail} />
                           </div>
                           {errors.email && touched.email ? <div className={styles.error}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="rgba(255,26,64,1)" /></svg> {errors.email}</div> : null}

                           <div className={`${styles.inputField} ${(errors.password && touched.password) ? styles.errorField : undefined} ${isPasswordWrong && styles.errorField}`}>
                              <Field id="password" className={((errors.password && touched.password) || isPasswordWrong) ? styles.errorField : undefined} type={`${isShown ? 'text' : 'password'}`} name="password" placeholder="Password" validate={validate} innerRef={inputRef} />
                              {isShown ?
                                 <svg onClick={toggleShowPasswordClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M1.181 12C2.121 6.88 6.608 3 12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" fill="rgba(149,149,149,1)" /></svg>
                                 :
                                 <svg onClick={toggleShowPasswordClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M9.342 18.782l-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l1.968-.359C3.903 10.812 7.579 14 12 14c4.42 0 8.097-3.188 8.856-7.39l1.968.358a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0l-.788 2.94z" fill="rgba(149,149,149,1)" /></svg>
                              }
                           </div>
                           {errors.password && touched.password ? <div className={styles.error}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="rgba(255,26,64,1)" /></svg> {errors.password}</div> : null}
                           {isPasswordWrong && <div className={styles.error}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z" fill="rgba(255,26,64,1)" /></svg> Password is incorrect</div>}
                           <button className={styles.btn} type="submit" onClick={() => validateForm()}>{isSignUpForm ? 'Sign up' : 'Log in'}</button>
                           <button className={`${styles.btn} ${styles.btnSocial}`} onClick={handleGoogleSignUp} type="button">
                            <img src='../google.png' alt='google-logo' />  Log in with Google 
                           </button>
                           {
                              isSignUpForm ?
                                 <span className={styles.info}>Already have an account? <Link to='/logIn'>Log in</Link></span> :
                                 <span className={styles.info}>Don't have an account? <Link to='/signUp'>Sign up for free</Link></span>
                           }
                        </Form>
                     )}
                  </Formik>
                  {!isSignUpForm && <img className={styles.img} src="./sneaker.jpg" alt="sneaker" />}
               </div>
            </div >
         }
         {isLogged && !showMessage && <p className={styles.message}>Welcome{!isSignUpForm && ' back'}, {userName}!</p>}
         {isLogged && showMessage && <Navigate to='/' />}
      </>
   );
}

export default AccountForm;