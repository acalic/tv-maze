import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Pagination, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import { apiUrl } from "@utils/globals";
import { getTimestampDifferenceInSeconds } from "@utils/functions";
import ShowsList from "@components/ShowsList";
import SearchResults from "@components/SearchResults";

const Homepage = () => {
  const { search } = useLocation();

  let searchParams = new URLSearchParams(search);
  let page = searchParams.get("page");

  const paginationLength = 20;

  const [shows, setShows] = useState([]);
  const [activePage, setActivePage] = useState(page | 0);

  const showsFavorites = useSelector((state) => state.favorites.favorites);
  const searchResultsAll = useSelector((state) => state.searches.searchShows);

  const searchResultsLast =
    searchResultsAll && searchResultsAll.length
      ? searchResultsAll[searchResultsAll.length - 1]
      : null;

  const secondsBetweenLastSearch = getTimestampDifferenceInSeconds(
    searchResultsLast?.timestamp
  );

  const fetchShows = (page = 0) => {
    fetch(`${apiUrl}/shows?page=${page}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length) {
          setShows(data);
          setActivePage(page);
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: false });
      });
  };

  const PaginationItems = ({ length }) => {
    let paginationItems = [];
    for (let i = 0; i < length; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          href={`/shows?page=${i}`}
        >
          {i}
        </Pagination.Item>
      );
    }
    return <>{paginationItems}</>;
  };

  useEffect(() => {
    fetchShows(activePage);
  }, [activePage]);

  return (
    <>
      <h2>Favorites</h2>
      {showsFavorites && showsFavorites.length ? (
        <ShowsList shows={showsFavorites} isFavoritesList />
      ) : (
        <Alert variant="light d-inline-flex align-items-center mb-3">
          <span className="px-2">
            No favorites added yet, please click on the star icon next to the
            show title to add it to the list!
          </span>
        </Alert>
      )}

      {searchResultsLast && secondsBetweenLastSearch < 2 ? (
        <SearchResults searchResults={searchResultsLast.searchResults} />
      ) : (
        <>
          <h2 className="m-0">All shows</h2>
          <ShowsList shows={shows} />

          <Pagination className="justify-content-center">
            <PaginationItems length={paginationLength} />
          </Pagination>
        </>
      )}
    </>
  );
};

export default Homepage;
