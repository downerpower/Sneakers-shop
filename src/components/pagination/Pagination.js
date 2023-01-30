import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import SneakerCard from '../SneakerCard';

function Pagination({ sneakerData }) {
   const [currentItems, setCurrentItems] = useState([]);
   const [pageCount, setPageCount] = useState(0);
   const [itemsOffSet, setItemsOffSet] = useState(0);

   const itemsPerPage = 16;

   useEffect(() => {
      const itemEndOffset = itemsOffSet + itemsPerPage;
      sneakerData && setCurrentItems(sneakerData.slice(itemsOffSet, itemEndOffset))
      sneakerData && setPageCount(Math.ceil(sneakerData.length / itemsPerPage))
   }, [sneakerData, itemsOffSet, itemsPerPage])

   const handlePageClick = (e) => {
      const newItemOffSet = (e.selected * itemsPerPage) % sneakerData.length;
      setItemsOffSet(newItemOffSet);
   }

   return (
      <>
         <div className='sneaker-list'>
            {currentItems.map(sneaker => <SneakerCard key={sneaker.id} sneaker={sneaker} />)}
         </div>
         < ReactPaginate
            breakLabel="..."
            nextLabel={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path fill="none" d="M0 0h24v24H0z" /><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" /></svg>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={pageCount}
            previousLabel={<svg className='arrowLeft' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28"><path fill="none" d="M0 0h24v24H0z" /><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z" /></svg>}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active"
            disabledLinkClassName="disabled"
         />
      </>

   );
}

export default Pagination;