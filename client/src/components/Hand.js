import React, { Component, useEffect, useState } from "react";
import { Card } from "./Card";
const style = {
  minHeight: "12.4rem",
  maxHeight: "12.4rem",
  minWidth: "640px",
  margin: "0 auto 0 auto",
  justifyItems: "space-between",
  color: "white",
  overflow: "scroll",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const Hand = ({ cards, flippedOver, playerId }) => {
  return (
    <React.Fragment>
      <div id={"hand"+playerId} style={style}>
        {cards &&
          cards.map((pokemon, index) => (
            <Card
              index={index}
              key={index}
              id={pokemon.id + playerId + index + "hand"}
              name={pokemon.name}
              url={pokemon.images?.large}
              flippedOver={flippedOver}
              supertype={pokemon.supertype}
              location={"hand"}
              playerId={playerId}
              currentHp={Number(pokemon.hp)}
              maxHp={Number(pokemon.hp)}
              energies={pokemon.energies}
              attacks={pokemon.attacks}
            />
          ))}
      </div>
    </React.Fragment>
  );
};