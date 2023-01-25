import { useEffect, useState } from "react";
import SneakerCard from "./SneakerCard";

const SneakerList = () => {
   const [sneakers, setSneakers] = useState([]);

   useEffect(() => {
      fetch('https://example-data.draftbit.com/sneakers?_limit=10')
         .then(res => res.json())
         .then(data => {
            console.log(data)
            setSneakers(data)
         })
   }, [])
   return (
      <div className="sneaker-list">
         {sneakers && sneakers.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker} />)}
      </div>
   );
}

export default SneakerList;