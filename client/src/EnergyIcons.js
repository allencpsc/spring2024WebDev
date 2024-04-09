import React from "react";

const style ={
    height: '1.5rem',
    width: 'auto',
    margin: '0rem',
    display: 'flex'
}
export const EnergyIcons = (props) => {
    return(props.energies.map((energy,index) =>
    <img src={energy.images.small} style={style}></img>))
}