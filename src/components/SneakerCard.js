import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SneakerCard.module.css'
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from '../features/favoritesSlice';
import { addToCart, removeFromCart } from '../features/cartSlice';
import { useWindowWidthContextContext } from "../context/WindowWidthContext";

const SneakerCard = ({ sneaker }) => {
   const [isIconShown, setIsIconShown] = useState(false);

   const { isDesktop } = useWindowWidthContextContext();

   const classes = isIconShown ? `${styles.heartIcon}` : `${styles.hidden}`;

   const favorites = useSelector(state => state.favorites.value);
   const cartItems = useSelector(state => state.cart.value);

   const isInCartItems = id => cartItems.some(item => item.id === id);
   const isInFavorites = id => favorites.some(item => item.id === id);

   const dispatch = useDispatch();

   const handleAddToFavoriteClick = () => {
      dispatch(addToFavorites(sneaker))
   }

   const handleAddToCartClick = () => {
      dispatch(addToCart(sneaker))
   }

   return (
      <div
         className={styles.sneakerCardContainer}
         onMouseEnter={() => setIsIconShown(true)}
         onMouseLeave={() => setIsIconShown(false)}
      >
         {
            !isInFavorites(sneaker.id) ?
               <svg onClick={handleAddToFavoriteClick} className={`${styles.heartIcon} ${isDesktop ? classes : undefined}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35"><path fill="none" d="M0 0H24V24H0z" /><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421 1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z" fill="rgba(126,125,125,1)" /></svg>
               :
               <svg onClick={() => dispatch(removeFromFavorites(sneaker.id))} className={`${styles.heartIcon} ${isDesktop ? classes : undefined}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35"><path fill="none" d="M0 0H24V24H0z" /><path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 3 11 4 12 5c1-1 2.64-2 4.5-2z" fill="rgba(126,125,125,1)" /></svg>
         }
         <Link to={`/${sneaker.id}`}>
            <div>
               {sneaker.media.smallImageUrl && <img src={sneaker.media.smallImageUrl} alt={sneaker.title} className={styles.cardImg} />}
            </div>
         </Link>
         <div className={styles.cardContent}>
            <span className={styles.cardTitle}>{sneaker.title}</span>
            <span className={styles.cardInfo}>{sneaker.brand}</span>
            <span className={styles.cardInfo}>${sneaker.retailPrice}</span>
            {
               !isInCartItems(sneaker.id) ?
                  <svg onClick={handleAddToCartClick} className={styles.cartIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35"><path fill="none" d="M0 0h24v24H0z" /><path d="M4 16V4H2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1zm2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(126,125,125,1)" /></svg>
                  :
                  <svg onClick={() => dispatch(removeFromCart(sneaker.id))} className={styles.cartIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35"><path fill="none" d="M0 0h24v24H0z" /><path d="M6 9h13.938l.5-2H8V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5a1 1 0 0 1-1-1V4H2V2h3a1 1 0 0 1 1 1v6zm0 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="rgba(126,125,125,1)" /></svg>
            }
         </div>
      </div >
   );
}

export default SneakerCard;