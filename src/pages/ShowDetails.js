import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { apiUrl } from "@utils/globals";
import { Row, Button, Col, Image } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";

import { addFavorite, removeFavorite } from "@app/actions";

import SeasonsList from "@components/SeasonsList";
import Rating from "@components/Rating";
import { removeHTML } from "@utils/functions";

const ShowDetails = () => {
  let { id } = useParams();

  const dispatch = useDispatch();

  const [showDetails, setShowDetails] = useState([]);
  const [showSeasons, setShowSeasons] = useState([]);

  const showsFavorites = useSelector((state) => state.favorites.favorites);
  const isShowInFavorites = () =>
    showsFavorites.some((item) => parseInt(item.id) === parseInt(id));

  const fetchShowDetails = () => {
    fetch(`${apiUrl}/shows/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setShowDetails(data);
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: false });
      });
  };

  const fetchShowSeasons = () => {
    fetch(`${apiUrl}/shows/${id}/seasons`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length) {
          setShowSeasons(data);
        }
      })
      .catch((error) => {
        toast.error(error.message, { autoClose: false });
      });
  };

  useEffect(() => {
    fetchShowDetails();
    fetchShowSeasons();
  }, []);

  return (
    <Row className="page-show-details">
      <Col>
        <h1 className="page-show-details-title mb-0 d-flex align-items-center">
          <span>{showDetails?.name}</span>

          <Button
            variant="none"
            onClick={() =>
              dispatch(
                isShowInFavorites()
                  ? removeFavorite(showDetails)
                  : addFavorite(showDetails)
              )
            }
          >
            <FaStar color={isShowInFavorites() ? "gold" : "#212529"} />
          </Button>
        </h1>
        <div className="mb-3 text-light page-show-details-subtitle">
          <span>Premiered: {showDetails?.premiered?.substr(0, 4)}</span> &bull;
          {showDetails?.rating?.average && (
            <span>
              {" "}
              Average rating: <Rating rating={showDetails.rating.average} />
            </span>
          )}
        </div>
        <div className="page-show-details-text">
          {removeHTML(showDetails?.summary)}
        </div>
        <div className="mt-3">
          <Button
            variant="dark"
            onClick={() =>
              dispatch(
                isShowInFavorites()
                  ? removeFavorite(showDetails)
                  : addFavorite(showDetails)
              )
            }
          >
            {isShowInFavorites() ? "Remove from favorites" : "Add to favorites"}
          </Button>
        </div>
        <h3 className="text-light mt-3 mt-sm-5 mb-3">Seasons:</h3>
        <SeasonsList seasons={showSeasons} />
      </Col>
      <Col xs={12} md={6} className="mt-md-5">
        <Image
          className="fluid page-show-details-img"
          src={showDetails?.image?.original}
        ></Image>
      </Col>
    </Row>
  );
};

export default ShowDetails;
