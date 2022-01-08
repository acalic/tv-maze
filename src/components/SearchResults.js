import React from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import ShowsList from "@components/ShowsList";

const SearchResults = ({ searchResults }) => {
  return (
    <>
      <h2>Search results</h2>
      {searchResults.length ? (
        <ShowsList shows={searchResults} />
      ) : (
        <Alert variant="light d-inline-flex align-items-center mb-3">
          <span className="px-2">
            Sorry, search results are empty! &nbsp;
            <Link to="/">Back to all shows</Link>
          </span>
        </Alert>
      )}
    </>
  );
};

export default SearchResults;
