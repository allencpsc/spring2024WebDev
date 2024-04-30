import React from "react";
import { Card } from "./Card";

const style = {
    height: "13.4rem",
    backgroundColor: "#3a4b9f",
    borderRadius: "15px",
    color: "white",
    width: "10rem",
    margin: "0.2rem 0rem 0.2rem 1rem",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
}

export const Deck = ({ cards, playerId }) => {
    return (
        <div className="Deck position-relative" style={style}>
            <div className="position-absolute bottom-0 translate-middle-y mx-3">
                PLAYER {playerId} DECK
            </div>
                <Card flippedOver={true}/>
        </div>
    );
}