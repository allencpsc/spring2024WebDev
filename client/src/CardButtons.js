import React from "react";
import { MyButton } from "./ActionButton";

export const CardButtons = ({supertype, location, name, playerId, index, handleClose}) => {

    if(supertype === "Pokémon" && location === "hand") {
        return (
            <div>
                <MyButton className="Button" textValue="Place on Bench" name={name} playerId={playerId} index={index} handleClose={handleClose}/>
                <MyButton className="Button" textValue="Make Active" name={name} playerId={playerId} location={location} index={index}handleClose={handleClose}/>
            </div>
        )
    }
    else if(supertype === "Pokémon" && location === "Bench") {
        return (
            <div>
                <MyButton textValue="Make Active" playerId={playerId} location={location} index={index} handleClose={handleClose}/>    
                <MyButton className="Button" textValue="Switch" name={name} playerId={playerId} index={index} handleClose={handleClose}/>
            </div>
        )
    }
    else if(supertype === "Pokémon" && location === "Active") {
        return (
            <div>
                <MyButton textValue="Attack" />
                <MyButton className="Button" textValue="Retreat" handleClose={handleClose}/>
                <MyButton className="Button" textValue="Switch" name={name} playerId={playerId} index={index} handleClose={handleClose}/>
            </div>
        )
    }
    else if(supertype === "Trainer" && location === "hand") {
        return (
            <div>
                <MyButton textValue="Play" handleClose={handleClose} />
            </div>
        )
    }
    else if(supertype === "Energy" && location === "hand") {
        return (
            <div>
                <MyButton textValue="Attach" playerId={playerId} index={index} handleClose={handleClose}/>
            </div>
        )
    }
    else {
        return null;
    }
}
