import React from "react";
const style = {
    color: 'black',
    backgroundColor: 'white',
    height: '200px',
    width: '300px',
    border: '1px solid black',
    borderRadius: '15px',
    padding: '10px',
    fontFamily: 'Arial',
}
//TODO: Pick a better font to match Bangers
export const TextBox = ({text}) => {
    return(
        <div style={style}>
            {text}
        </div>
    )
}