import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Pagination, Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

import { apiUrl } from "@utils/globals";
import ShowsList from "@components/ShowsList";

const Homepage = () => {
  const { search } = useLocation();

  let searchParams = new URLSearchParams(search);
  let page = searchParams.get("page");

  const paginationLength = 20;

  const showsFavorites = useSelector((state) => state.favorites.favorites);

  const [shows, setShows] = useState([]);
  const [activePage, setActivePage] = useState(page | 0);

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
        alert(error);
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
          <FaInfoCircle></FaInfoCircle>
          <span className="px-2">
            No favorites added yet, please click on the star icon next to the
            show title to add it to the list!
          </span>
        </Alert>
      )}

      <h2>All shows</h2>

      <ShowsList shows={shows} />

      <Pagination className="justify-content-center">
        <PaginationItems length={paginationLength} />
      </Pagination>
    </>
  );
};

export default Homepage;
