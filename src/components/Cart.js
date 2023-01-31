import { useSelector } from "react-redux";
import styles from './Cart.module.css'
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

const Cart = () => {
   const cartItems = useSelector(state => state.cart.value);

   const dispatch = useDispatch();

   let totalSum = cartItems.reduce((acc, curValue) => acc + curValue.retailPrice, 0)

   return (
      <>
         {cartItems.length === 0 &&
            <p className="message--empty">Your Cart is empty
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M12 2c5.523 0 10 4.477 10 10 0 .727-.077 1.435-.225 2.118l-1.782-1.783a8 8 0 1 0-4.375 6.801 3.997 3.997 0 0 0 1.555 1.423A9.956 9.956 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2zm7 12.172l1.414 1.414a2 2 0 1 1-2.93.11l.102-.11L19 14.172zM12 15c1.466 0 2.785.631 3.7 1.637l-.945.86C13.965 17.182 13.018 17 12 17c-1.018 0-1.965.183-2.755.496l-.945-.86A4.987 4.987 0 0 1 12 15zm-3.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" /></svg>
            </p>}
         <div className={styles.cartContainer}>
            {cartItems.length > 0 && <div className={styles.cartWrapper}>
               {cartItems.map(item =>
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
            </div>}
            {cartItems.length > 0 && <div className={styles.cartTotal}>
               <span className={styles.sum}>
                  Total sum: ${totalSum}
               </span>
               <button className={styles.cartBtn}>Proceed to payment</button>
            </div>}
         </div>
      </>
   );
}

export default Cart;