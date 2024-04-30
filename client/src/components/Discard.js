import React from "react";
import { useState } from "react";
import { Card } from "./Card";
import { Modal } from "react-bootstrap";
const style = {
    height: "13.4rem",
    backgroundColor: "#1a203d",
    borderRadius: "15px",
    color: "white",
    width: "10rem",
    margin: "0.2rem 0rem 0.2rem 0rem",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
};


export default function Discard({ cards, playerId }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <div className="Discard position-relative" style={style}>
                <div className="position-absolute bottom-0 translate-middle-y mx-3">
                    PLAYER {playerId} DISCARD
                </div>
                {cards[0] &&
                        <Card
                            name={cards[0].name}
                            url={cards[0].images?.large}
                            supertype={cards[0].supertype}
                            location={"discard"}
                            playerId={playerId}
                            currentHp={Number(cards[0].hp)}
                            maxHp={Number(cards[0].hp)}
                            energies={cards[0].energies}
                            attacks={cards[0].attacks}
                        />
                    }
                <Modal show={show} onHide={handleClose} className="cardModal">
                    <Modal.Header closeButton={true} closeVariant="white"></Modal.Header>
                    <Modal.Body>
                        {cards[0] &&
                            cards.map((card, index) => (
                                <Card
                                    key={index}
                                    name={card.name}
                                    url={card.images?.large}
                                    supertype={card.supertype}
                                    location={"discard"}
                                    playerId={playerId}
                                    currentHp={Number(card.hp)}
                                    maxHp={Number(card.hp)}
                                    energies={card.energies}
                                    attacks={card.attacks}
                                />
                            ))}
                    </Modal.Body>
                    </Modal>
            </div>
        </React.Fragment>
    );
}