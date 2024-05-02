import React from "react";
const style = {
    color: "white",
    textAlign: "center",
}

export const KnockoutCounter = ({ knockouts, playerId }) => {
    var text = "";
    if (knockouts === 1) {
        text = "🟩 ⬛ ⬛"
    } else if (knockouts === 2) {
        text = "🟩 🟩 ⬛"
    }
    else if (knockouts === 3) {
        text = "🟩 🟩 🟩"
    }
    else if (knockouts === 0){
        text = "⬛ ⬛ ⬛"
    }
    return (
        <div className="KnockoutCounter" style={style} id={"knockouts"+playerId}>
        <h1>Knockouts:</h1>
        <h2>{text}</h2>
        </div>
    );
};