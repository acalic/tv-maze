import React from "react";
import { addFavorite, removeFavorite } from "@app/actions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import Rating from "@components/Rating";

const ShowsList = ({ shows, isFavoritesList = false }) => {
  return (
    <Row>
      {shows.map((show) => (
        <Col
          key={"show-" + show.id}
          lg={2}
          md={4}
          sm={6}
          xs={6}
          className="py-3 d-flex"
        >
          <Show show={show} isFavoritesList={isFavoritesList} />
        </Col>
      ))}
    </Row>
  );
};

const Show = ({ show, isFavoritesList }) => {
  const dispatch = useDispatch();
  const showsFavorites = useSelector((state) => state.favorites.favorites);
  const isShowInFavorites = () =>
    showsFavorites.some((item) => item.id === show.id);

  return (
    <Card className="card-movie w-100 border-0">
      {!isFavoritesList && <Card.Img variant="top" src={show?.image?.medium} />}
      <Card.Body className={"card-movie__body d-flex flex-column"}>
        <Card.Title className="d-flex justify-content-between align-items-center">
          {show?.name}
          {show?.premiered && <> ({show.premiered.substr(0, 4)})</>}
          <Button
            variant="none"
            className="btn-favorite"
            size="sm"
            onClick={() =>
              dispatch(
                isShowInFavorites() ? removeFavorite(show) : addFavorite(show)
              )
            }
          >
            <FaStar color={isShowInFavorites() ? "gold" : ""} />
          </Button>
        </Card.Title>

        {!isFavoritesList && (
          <Card.Text className="text-muted">
            <span>{show?.genres.join(", ")}</span>
          </Card.Text>
        )}

        <Card.Text className="text-muted mt-auto">
          {!isFavoritesList && show.rating.average && (
            <span className="mt-3">
              <span className="text-secondary">Rating:</span>{" "}
              <Rating rating={show.rating.average}></Rating>
            </span>
          )}
        </Card.Text>

        <Button
          href={`/shows/${show?.id}`}
          variant="dark"
          size={isFavoritesList ? "sm" : "md"}
        >
          See more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ShowsList;
