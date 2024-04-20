import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import pokemon from "pokemontcgsdk";
import { CardButtons } from "./controls/CardButtons";
import { EnergyIcons } from "./EnergyIcons";
import { AttackButtons } from "./controls/AttackButtons";
pokemon.configure({ apiKey: "0d524a9e-011f-4f8e-a972-ad3a71503346" });
const style = {
  borderRadius: "10px",
  marginRight: "0.5rem",
  marginBottom: "0.5rem",
  cursor: "pointer",
  float: "left",
  height: "161px",
};

export const Card = function Card(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const progressHp =
    props.currentHp && props.maxHp
      ? (Number(props.currentHp) / Number(props.maxHp)) * 100
      : 100;
  var color;

  if (progressHp <= 50) {
    color = "danger";
  } else {
    color = "success";
  }

  return (
    <div style={{ ...style }} data-testid={`box`}>
      <img
        src={
          props.flippedOver === true
            ? "https://vignette.wikia.nocookie.net/cardgame/images/a/ac/Pokemon-card-back.jpg/revision/latest/scale-to-width-down/342?cb=20131228023927"
            : props.url
        }
        height={161}
        style={{ borderRadius: "inherit" }}
        onClick={handleShow}
      ></img>

      {props.supertype === "Pokémon" && props.playerId === 1 && (
        <ProgressBar
          now={progressHp}
          variant={color}
          label={`${props.currentHp}`}
        />
      )}
      {props.supertype === "Pokémon" &&
        props.playerId === 2 &&
        props.location === "active" && (
          <ProgressBar
            now={progressHp}
            variant={color}
            label={`${props.currentHp}`}
          />
        )}
      <div>
        {props.supertype === "Pokémon" &&
          props.energies &&
          props.energies.length > 0 && (
            <EnergyIcons energies={props.energies} />
          )}
      </div>

      <Modal show={show} onHide={handleClose} className="cardModal">
        <Modal.Header closeButton={true} closeVariant="white"></Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col>
                <div className="d-grid gap-1">
                  {props.flippedOver === true ? null : (
                    <div>
                      <CardButtons
                        supertype={props.supertype}
                        attacks={props.attacks}
                        location={props.location}
                        name={props.name}
                        playerId={props.playerId}
                        index={props.index}
                        handleClose={handleClose}
                      />
                    </div>
                  )}
                </div>
              </Col>
              <Col className="col-9">
                <img
                  src={
                    props.flippedOver === true
                      ? "https://vignette.wikia.nocookie.net/cardgame/images/a/ac/Pokemon-card-back.jpg/revision/latest/scale-to-width-down/342?cb=20131228023927"
                      : props.url
                  }
                  className="h-75 d-inline modalImg"
                ></img>
                <div className="d-flex justify-content-between">
                  <AttackButtons
                    attacks={props.attacks}
                    location={props.location}
                    handleClose={handleClose}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};
