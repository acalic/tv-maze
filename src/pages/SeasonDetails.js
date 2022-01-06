import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "@utils/globals";
import { Figure, Row, Col, Image } from "react-bootstrap";

import EpisodesList from "@components/EpisodesList";
import { removeHTML } from "@utils/functions";

const SeasonDetails = () => {
  let { id } = useParams();

  const [seasonDetails, setSeasonDetails] = useState([]);
  const [seasonEpisodes, setSeasonEpisodes] = useState([]);

  const fetchSeasonDetails = () => {
    fetch(`${apiUrl}/seasons/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSeasonDetails(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const fetchEpisodesBySeason = () => {
    fetch(`${apiUrl}/seasons/${id}/episodes`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length) {
          setSeasonEpisodes(data);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    fetchSeasonDetails();
    fetchEpisodesBySeason();
  }, []);

  return (
    <Row className="page-season-details">
      <Col>
        <h1>Season {seasonDetails?.number}</h1>
        {seasonDetails?.summary && (
          <div className="page-show-details-text mb-3">
            {removeHTML(seasonDetails.summary)}
          </div>
        )}
        <h3 className="text-light mb-3">Episodes:</h3>
        <EpisodesList episodes={seasonEpisodes} />
      </Col>
      <Col xs={12} md={6}>
        {seasonDetails?.image?.original ? (
          <Image
            width={500}
            className="fluid page-show-details-img"
            src={seasonDetails.image.original}
          ></Image>
        ) : (
          <Figure className="fluid page-show-details-img">
            <Figure.Image
              width={500}
              height={800}
              alt="500x800"
              src="https://via.placeholder.com/500x800/212529/cbcbcb/?text="
            />
            <Figure.Caption>
              We don't have a cover image for this season yet!
            </Figure.Caption>
          </Figure>
        )}
      </Col>
    </Row>
  );
};

export default SeasonDetails;
