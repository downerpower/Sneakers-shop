import SneakerCard from "./SneakerCard";
import useFetch from "../hooks/useFetch";
import Pagination from "./pagination/Pagination";

const SneakerList = ({ query, selectedOption }) => {
   const pathname = window.location.pathname;

   let fetchUrl = (pathname === '/home' || pathname === '/new') ? `https://example-data.draftbit.com/sneakers?${query ? `&q=${query}` : ''}${selectedOption ? `&_sort=retailPrice&_order=${selectedOption}` : ''}` : `https://example-data.draftbit.com/sneakers?gender=${pathname.slice(1)}${query ? `&q=${query}` : ''}${selectedOption ? `&_sort=retailPrice&_order=${selectedOption}` : ''}`;

   const { data, error, loading } = useFetch(fetchUrl);

   const sneakers = data && data.filter(sneaker => sneaker.media && sneaker.retailPrice).filter(sneaker => sneaker.media.imageUrl !== "https://stockx-assets.imgix.net/media/New-Product-Placeholder-Default.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=0");

   return (
      <>
         {sneakers && sneakers.length < 16 ?
            <div className="sneaker-list">
               {sneakers.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker} />)}
            </div>
            :
            <Pagination sneakerData={sneakers} />
         }
      </>
   );
}

export default SneakerList;