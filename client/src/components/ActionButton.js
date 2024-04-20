import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { paths } from "../resources/const.js";
import { useStore } from "../resources/store.js";
var style = {
  color: "white",
  padding: "5px 15px",
  border: "1px white",
  backgroundColor: "rgb(256 230 34 / 90%)",
};
export const ActionButton = (props) => {
  const moveToBench = useStore((state) => state.moveToBench);
  const makeActive = useStore((state) => state.makeActive);
  const attachEnergy = useStore((state) => state.attachEnergy);
  const benchArr = useStore((state) => state.player1.bench);
  const utilizePotion = useStore((state) => state.usePotion);

  const backgroundColor = props.backgroundColor || "#3f51b";
  const updatedStyle = {
    ...style,
    backgroundColor: backgroundColor,
  };

  const handleClick = () => {
    if (props.textValue === "Place on Bench") {
      moveToBench(props.playerId, props.index);
      axios
        .post(paths.root + "/place-card", {
          cardName: props.name,
          location: "Bench",
          benchSlot: benchArr.length,
        })
        .then(function (response) {
          console.log("Backend api call successful - placed active");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (props.textValue === "Make Active") {
      makeActive(props.playerId, props.location, props.index);
      //need to eventually change to have playerId tell what endpoint to go to
      axios
        .post(paths.root + "/turn-zero/player1", {
          command: props.name,
        })
        .then(function (response) {
          // handle success
          console.log("Backend api call successful - place active");
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    } else if (props.textValue === "Use") {
      console.log("Using trainer card");
      utilizePotion(props.index);
    } else if (props.textValue === "Attach") {
      console.log(props.playerId);
      console.log("Attaching energy from MyButton");
      attachEnergy(props.playerId, props.index, "active", "0");
    } else if (props.isAttack === true) {
      console.log("Attack name:" + props.textValue);
      //TODO: attack api call
    } else {
      alert("I could call the API from here!");
    }
    props.handleClose();
  };
  return (
    <Button className="flex-fill" onClick={handleClick} style={updatedStyle}>
      {props.textValue}
    </Button>
  );
};
