import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import pokemon from "pokemontcgsdk";
import { CardButtons } from "./CardButtons";
import { EnergyIcons } from "./EnergyIcons";
import { AttackButtons } from "./AttackButtons";
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
      : 0;
  var color;

  if (progressHp <= 50) {
    color = "danger";
  } else {
    color = "success";
  }

  var showHp = false;

  if (props.supertype === "Pokémon") {
    if(props.playerId === 1 && (props.location === "active" || props.location === "bench")) {
      showHp = true;
    }
    else if(props.playerId === 2 && props.location === "active") {
      showHp = true;
    }
  }

  return (
    <div style={{ ...style }} id={props.name+props.playerId}>
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
      {showHp&& (
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
                  {props.playerId !== 1 ? null : (
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

                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};
