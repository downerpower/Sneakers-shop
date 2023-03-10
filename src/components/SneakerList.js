import SneakerCard from "./SneakerCard";
import useFetch from "../hooks/useFetch";
import Pagination from "./pagination/Pagination";
import { LoopCircleLoading } from "react-loadingg";
import Main from "./Main";

const SneakerList = ({ query, selectedOption }) => {
  const pathname = window.location.pathname;

  let fetchUrl =
    pathname === "/"
      ? `https://example-data.draftbit.com/sneakers?${
          query ? `&q=${query}` : ""
        }${selectedOption ? `&_sort=retailPrice&_order=${selectedOption}` : ""}`
      : `https://example-data.draftbit.com/sneakers?gender=${pathname.slice(
          1
        )}${query ? `&q=${query}` : ""}${
          selectedOption ? `&_sort=retailPrice&_order=${selectedOption}` : ""
        }`;

  const { data, loading } = useFetch(fetchUrl);

  const uniqueData = data && [
    ...new Map(data.map((element) => [element.title, element])).values(),
  ];

  const sneakers =
    uniqueData &&
    uniqueData
      .filter((sneaker) => sneaker.media && sneaker.retailPrice)
      .filter(
        (sneaker) =>
          sneaker.media.imageUrl !==
          "https://stockx-assets.imgix.net/media/New-Product-Placeholder-Default.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&trim=color&q=90&dpr=2&updated_at=0"
      )
      .filter(
        (sneaker) => sneaker.title !== "adidas Ultraboost 19 Linen Ash Green"
      );
  return (
    <>
      {loading && <LoopCircleLoading color="black" />}
      {!loading && sneakers && sneakers.length === 0 && (
        <p className="message--empty">
          Nothing mathes your search
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 2c5.523 0 10 4.477 10 10 0 .727-.077 1.435-.225 2.118l-1.782-1.783a8 8 0 1 0-4.375 6.801 3.997 3.997 0 0 0 1.555 1.423A9.956 9.956 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2zm7 12.172l1.414 1.414a2 2 0 1 1-2.93.11l.102-.11L19 14.172zM12 15c1.466 0 2.785.631 3.7 1.637l-.945.86C13.965 17.182 13.018 17 12 17c-1.018 0-1.965.183-2.755.496l-.945-.86A4.987 4.987 0 0 1 12 15zm-3.5-5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
          </svg>
        </p>
      )}
      {sneakers && sneakers.length < 16 ? (
        <div className="main-container">
          <Main />
          <div className="sneaker-list">
            {sneakers.map((sneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
        </div>
      ) : (
        <Pagination sneakerData={sneakers} />
      )}
    </>
  );
};

export default SneakerList;
