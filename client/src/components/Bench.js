import React, { useEffect, useState } from "react";
import { Card } from "./Card";

const style = {
  height: "12.4rem",
  width: "auto",
  minHeight: "12.4rem",
  minWidth: "640px",
  margin: "1rem",
  padding: "1rem",
  backgroundColor: "rgb(11 100 200 / 100%)",
  borderRadius: "15px",
  justifyItems: "space-between",
  color: "white",
};

export const Bench = ({ cards, playerId }) => {
  return (
    <React.Fragment>
      <div style={style} className="Bench">
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
      </div>
    </React.Fragment>
  );
};
