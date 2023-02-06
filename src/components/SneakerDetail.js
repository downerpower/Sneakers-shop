import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from '../features/favoritesSlice';
import { addToCart, removeFromCart } from '../features/cartSlice';
import useFetch from "../hooks/useFetch";
import styles from './SneakerDetail.module.css'

const SneakerDetail = () => {
   const { id } = useParams();

   const { data } = useFetch(`https://example-data.draftbit.com/sneakers/${id}`);

   const favorites = useSelector(state => state.favorites.value);
   const cartItems = useSelector(state => state.cart.value);

   const isInCartItems = id => cartItems.some(item => item.id === id);
   const isInFavorites = id => favorites.some(item => item.id === id);

   const dispatch = useDispatch();

   const handleAddToFavoriteClick = () => {
      dispatch(addToFavorites(data));
   }

   const handleAddToCartClick = () => {
      dispatch(addToCart(data));
   }

   return (
      <>
         {data &&
            <div className={styles.wrapper}>
               <div>
                  <img src={data.media.smallImageUrl} alt={data.title} className={styles.img} />
               </div>
               <div className={styles.content}>
                  <div className={styles.info}>
                     <span className={styles.title}>{data.title}</span>
                     <span>{data.year}</span>
                     <span>${data.retailPrice}</span>
                  </div>
                  <div className={styles.btns}>
                     {!isInCartItems(data.id) ?
                        <button onClick={handleAddToCartClick}>Add to Cart</button> :
                        <button onClick={() => dispatch(removeFromCart(data.id))} >Remove from Cart</button>
                     }
                     {
                        !isInFavorites(data.id) ?
                           <button onClick={handleAddToFavoriteClick}>Save for later</button> :
                           <button onClick={() => dispatch(removeFromFavorites(data.id))}>Remove from favorites</button>
                     }
                  </div>
               </div>
            </div>
         }
      </>
   );
}

export default SneakerDetail;