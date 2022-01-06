import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

import ShowsList from "@components/ShowsList";

const Favorites = () => {
  const showsFavorites = useSelector((state) => state.favorites.favorites);
  return (
    <>
      <h2>Favorites</h2>
      {showsFavorites && showsFavorites.length ? (
        <ShowsList shows={showsFavorites} />
      ) : (
        <Alert variant="light d-inline-flex align-items-center mb-5">
          <FaInfoCircle></FaInfoCircle>
          <span className="px-2">
            No favorites added yet, please click on the star icon next to the
            show title to add it to the list!
          </span>
        </Alert>
      )}
    </>
  );
};

export default Favorites;
