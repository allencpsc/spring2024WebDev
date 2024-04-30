import React from "react";

const style = {
    height: "13.4rem",
    backgroundColor: "#1a203d",
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
            {cards[0] &&
                <div className="card">
                    <img src={cards[0].images?.large} alt={cards[0].name} />
                </div>
            }
        </div>
    );
}