import { useSelector } from "react-redux";
import styles from './Cart.module.css'
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

const Cart = () => {
   const cartItems = useSelector(state => state.cart.value);

   const dispatch = useDispatch();

   let totalSum = cartItems.reduce((acc, curValue) => acc + curValue.retailPrice, 0)

   return (
      <div className={styles.cartContainer}>
         <div className={styles.cartWrapper}>
            {cartItems && cartItems.map(item =>
               <div className={styles.cart} key={item.id}>
                  <img src={item.media.smallImageUrl} alt={item.title} className={styles.cartImg} />
                  <div className={styles.cartContent}>
                     <span className={styles.cartTitle}>{item.title}</span>
                     <span className={styles.cartInfo}>{item.brand}</span>
                     <span className={styles.cartInfo}>${item.retailPrice}</span>
                  </div>
                  <svg onClick={() => dispatch(removeFromCart(item.id))} className={styles.iconDelete} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(126,125,125,1)" /></svg>
               </div>
            )}
         </div>
         <div className={styles.cartTotal}>
            Total sum: $ {totalSum}
         </div>
      </div>
   );
}

export default Cart;