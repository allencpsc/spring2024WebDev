import React from "react";
import { ActionButton } from "./ActionButton";
import { useStore } from "./resources/store.js";

export const AttackButtons = ({location, attacks, handleClose}) => {
    const attack = useStore((state) => state.attack);
    if(location === "active") {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-around">
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
                        return(<ActionButton textValue={attack.name} key={index} isAttack={true} backgroundColor={backgroundColor} handleClose={handleClose}/>);
                    })
                    }
                </div>
            </React.Fragment>
        )
    }
    else {
        return null;
    }
}
