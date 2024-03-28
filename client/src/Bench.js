import { CardSlot } from "./CardSlot";
import React, { useEffect, useState } from "react";
import { Card } from './Card'

const style = {
    height: '12.4rem',
    width: 'auto',
    minHeight: '12.4rem',
    minWidth: '640px',
    margin: '1rem',
    backgroundColor: 'rgb(11 100 200 / 100%)',
    borderRadius: '15px',
    justifyItems: 'space-between',
    minHeight: '12.4rem',
    minWidth:'640px',
    color: 'white'
}


export const Bench = ({cards, playerId}) => {

    return(
        <React.Fragment>
            {console.log("Got to bench")}
            <div style={style} className="Bench">
                {console.log(cards)}
                {cards.map((pokemon,index) => 
                    
                    <Card  key={pokemon.id} 
                    index={index}
                    name = {pokemon.name} 
                    url={pokemon.images?.large} 
                    flippedOver = {pokemon.flippedOver}
                    supertype= {pokemon.supertype} 
                    location={"Bench"}
                    playerId = {playerId}/>)}
            </div>
        </React.Fragment>
    )
}
