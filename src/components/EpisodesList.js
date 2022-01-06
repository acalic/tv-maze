import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Image, Accordion, Badge } from "react-bootstrap";
import { removeHTML, dateTimeFormat } from "@utils/functions";

const EpisodesList = ({ episodes }) => {
  const localTimezone = useSelector((state) => state.timezone.localTimezone);

  return (
    <>
      {episodes.map((episode, i) => (
        <Accordion key={"episode-" + i} className="accordion-list mb-2">
          <Accordion.Item eventKey={i}>
            <Accordion.Header>
              Episode {episode.number} - {episode.name}
            </Accordion.Header>
            <Accordion.Body className="text-light">
              <Row>
                <Col>
                  <div className="text-muted mb-3">
                    Aired: {dateTimeFormat(episode.airstamp, localTimezone)}
                    <Badge size="sm" bg="light" className="mt-3 text-dark">
                      Local timezone: {localTimezone ? "ON" : "OFF"}
                    </Badge>
                  </div>
                  Summary:
                  {episode?.summary ? (
                    <div>{removeHTML(episode?.summary)}</div>
                  ) : (
                    <div>
                      We don't have a summary for Episode {episode.number} yet!
                    </div>
                  )}
                </Col>
                {episode?.image?.medium && (
                  <Col>
                    <Image
                      className="fluid page-show-details-img"
                      src={episode.image.medium}
                    ></Image>
                  </Col>
                )}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
};

export default EpisodesList;
