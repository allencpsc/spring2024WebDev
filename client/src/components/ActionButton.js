import React from "react";
import { Button } from "react-bootstrap";
import { useStore } from "../resources/store.js";
var style = {
  color: "white",
  padding: "5px 15px",
  border: "none",
  margin: "5px",
};
export const ActionButton = (props) => {
  const moveToBench = useStore((state) => state.moveToBench);
  const makeActive = useStore((state) => state.makeActive);
  const attachEnergy = useStore((state) => state.attachEnergy);
  const utilizePotion = useStore((state) => state.usePotion);
  const attack = useStore((state) => state.attack);

  const backgroundColor = props.backgroundColor || "#3f51b";
  const updatedStyle = {
    ...style,
    backgroundColor: backgroundColor,
  };

  const handleClick = () => {
    if (props.textValue === "Place on Bench") {
      moveToBench(props.playerId, props.index);
    } else if (props.textValue === "Make Active") {
      makeActive(props.playerId, props.location, props.index);
    } else if (props.textValue === "Use") {
      utilizePotion(props.index);
    } else if (props.textValue === "Attach") {
      attachEnergy(props.playerId, props.index, "active", "0");
    } else if (props.isAttack === true) {
      attack(props.textValue)
    }
    props.handleClose();
  };
  return (
    <Button className="flex-fill actionButton" onClick={handleClick} style={updatedStyle} id={props.textValue+props.playerId}>
      {props.textValue}
    </Button>
  );
};
