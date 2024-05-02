import React, { useEffect, useState } from "react";
import { Card } from "./Card";

const style = {
  height: "12.5rem",
  minWidth: "640px",
  minHeight: "12.4rem",
  width: "auto",
  margin: "0rem 0rem 0rem 2rem",
  padding: "0.5rem",
  backgroundColor: "rgb(11 100 200 / 100%)",
  borderRadius: "15px",
  justifyItems: "space-between",
  color: "white",
  border: "5px solid #e8d224"
};

export const Bench = ({ cards, playerId }) => {
  const id = "bench"+playerId;
  return (
    <React.Fragment>
      
      <div style={style} className="Bench position-relative" id={id}>
        
        {cards.map((pokemon, index) => (
          <Card
            id={pokemon.id + playerId + index + "bench"}
            index={index}
            key={index}
            name={pokemon.name}
            url={pokemon.images?.large}
            flippedOver={pokemon.flippedOver}
            supertype={pokemon.supertype}
            location={"bench"}
            playerId={playerId}
            currentHp={pokemon.hp}
            maxHp={pokemon.hp}
            energies={pokemon.energies}
            attacks={pokemon.attacks}
          />
        ))}
          <div className="position-absolute bottom-0 start-100 mx-2">
            PLAYER {playerId} BENCH
          </div>
        </div>
    </React.Fragment>
  );
};
