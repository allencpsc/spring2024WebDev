import React, {useState} from "react";
import { useDrop } from "react-dnd";
import { Card } from "./Card";

const POKEMON = [
    { id: 1, name: 'Alakazam', url: 'https://images.pokemontcg.io/base6/1_hires.png'},
    { id: 2, name: 'Articuno', url: 'https://images.pokemontcg.io/base6/2_hires.png'},
    { id: 3, name: 'Charizard', url: 'https://images.pokemontcg.io/base6/3_hires.png'},
    { id: 4, name: 'Dark Blastoise', url: 'https://images.pokemontcg.io/base6/4_hires.png'},
    { id: 5, name: 'Dark Dragonite', url: 'https://images.pokemontcg.io/base6/5_hires.png'}   
]

export const Hand = () => {
    const[hand, setHand] = useState([])
    
    return(
        <React.Fragment>
            <div className="hand">
                {POKEMON.map(pokemon => <Card  key={pokemon.id} name = {pokemon.name} url={pokemon.url} />)}
            </div>
        </React.Fragment>
    )
}

