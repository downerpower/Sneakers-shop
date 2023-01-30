import { useSelector } from "react-redux";

const Favorite = () => {
   const favorites = useSelector(state => state.favorites.value);

   return (
      <div>
         These are favorites
         {/* {favorites && favorites.map(favorite => <p>{favorite.title}</p>)} */}
      </div>
   );
}

export default Favorite;