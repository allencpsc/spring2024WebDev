import React from "react";
import { ActionButton } from "./ActionButton";

export const CardButtons = ({supertype, location, name, playerId, index, handleClose}) => {

    if(supertype === "Pokémon" && location === "hand") {
        return (
            <div>
                <ActionButton className="Button" textValue="Place on Bench" name={name} playerId={playerId} index={index} handleClose={handleClose}/>
                <ActionButton className="Button" textValue="Make Active" name={name} playerId={playerId} location={location} index={index}handleClose={handleClose}/>
            </div>
        )
    }
    else if(supertype === "Pokémon" && location === "bench") {
        return (
            <div>
                <ActionButton textValue="Make Active" playerId={playerId} location={location} index={index} handleClose={handleClose}/>    
                <ActionButton className="Button" textValue="Switch" name={name} playerId={playerId} index={index} handleClose={handleClose}/>
            </div>
        )
    }
    else if(supertype === "Pokémon" && location === "active") {
        return (
            <div>
                <ActionButton className="Button" textValue="Retreat" handleClose={handleClose}/>
                <ActionButton className="Button" textValue="Switch" name={name} playerId={playerId} index={index} handleClose={handleClose}/>

            </div>
        )
    }
    else if(supertype === "Trainer" && location === "hand") {
        return (
            <div>
                <ActionButton textValue="Use" index={index} handleClose={handleClose} />
            </div>
        )
    }
    else if(supertype === "Energy" && location === "hand") {
        return (
            <div>
                <ActionButton textValue="Attach" playerId={playerId} index={index} handleClose={handleClose}/>
            </div>
        )
    }
    else {
        return null;
    }
}
