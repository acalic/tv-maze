import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Pagination, Alert } from "react-bootstrap";
import { toast } from "react-toastify";

import { apiUrl } from "@utils/globals";
import ShowsList from "@components/ShowsList";

const ShowSearchResults = (searchResultsLast) => (
  <>
    <h2>Search results</h2>
    {searchResultsLast.searchResults.length ? (
      <ShowsList shows={searchResultsLast.searchResults} />
    ) : (
      <Alert variant="light d-inline-flex align-items-center mb-3">
        <span className="px-2">
          Sorry, search results empty! &nbsp;
          <Link to="/">Back to all shows</Link>
        </span>
      </Alert>
    )}
  </>
);

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

  const timeNow = new Date();
  const timeLastSearch = new Date(searchResultsLast?.timestamp);
  const secondsBetweenLastSearch =
    (timeNow.getTime() - timeLastSearch.getTime()) / 1000;

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
        <ShowSearchResults {...searchResultsLast} />
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
