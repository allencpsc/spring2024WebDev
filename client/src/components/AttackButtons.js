import React from "react";
import { ActionButton } from "./ActionButton";

export const AttackButtons = ({ location, attacks, handleClose, playerId }) => {
  if (location === "active") {
    return (
      <React.Fragment>
        <div className="attackButtons justify-content-around">
          {attacks.map((attack, index) => {
            var backgroundColor;
            switch (attack.cost[0]) {
              case "Grass":
                backgroundColor = "green";
                break;
              case "Fire":
                backgroundColor = "red";
                break;
              case "Water":
                backgroundColor = "blue";
                break;
              default:
                backgroundColor = "#555555";
                break;
            }
            return (
              <ActionButton
                textValue={attack.name}
                playerId={playerId}
                key={index}
                isAttack={true}
                backgroundColor={backgroundColor}
                handleClose={handleClose}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};
