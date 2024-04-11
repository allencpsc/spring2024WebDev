import React, {Component, useEffect, useState} from "react";
import { Card } from "./Card";
const style = {
    minHeight: '12.4rem',
    maxHeight: '12.4rem',
    minWidth: '640px',
    margin: '1rem',
    justifyItems: 'space-between',
    color: 'white',
    overflow: 'scroll',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

export const Hand = ({cards, flippedOver, playerId}) => {
    return(
        <React.Fragment>
            <div className="Hand" style={style}>
                    {cards && cards.map((pokemon, index) =>
                        <Card
                        index={index}
                        id = {pokemon.id+playerId+index+"hand"}
                        name = {pokemon.name}
                        url={pokemon.images?.large}
                        flippedOver = {flippedOver}
                        supertype= {pokemon.supertype}
                        location={"hand"}
                        playerId={playerId}
                        currentHp={Number(pokemon.hp)}
                        maxHp={Number(pokemon.hp)}
                        energies={pokemon.energies} />
                    )}
            </div>
        </React.Fragment>
    )

}
