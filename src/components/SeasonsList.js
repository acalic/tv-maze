import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { removeHTML } from "@utils/functions";

const SeasonsList = ({ seasons }) => {
  return (
    <>
      {seasons.map((season, i) => (
        <Accordion key={"season-" + i} className="accordion-list mb-2">
          <Accordion.Item eventKey={i}>
            <Accordion.Header>
              Season {season.number} ({season.premiereDate.substr(0, 4)})
            </Accordion.Header>
            <Accordion.Body className="text-light">
              Season summary:
              {season?.summary ? (
                <div>{removeHTML(season.summary)}</div>
              ) : (
                <div>
                  We don't have a summary for Season {season.number} yet!
                </div>
              )}
              <Button
                href={`/seasons/${season.id}`}
                variant="outline-info"
                className="mt-2"
              >
                View episodes
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
};

export default SeasonsList;
