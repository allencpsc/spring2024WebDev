import cardArray from './cardbase.json' assert { type: 'json' }; //'with' was throwing errors here
import Card from './Card.js';
import mongoose from 'mongoose'
var playerDeck = []

class Deck {
    constructor(){
        this.cardList = createDeck.createCard()
    }
}

const createDeck = {
    createCard() {
        for (let eachCard in cardArray){
            let gameCard = new Card(cardArray[eachCard].id, cardArray[eachCard].name, cardArray[eachCard].supertype,
                cardArray[eachCard].hp, cardArray[eachCard].attacks, cardArray[eachCard].weaknesses,
                cardArray[eachCard].retreatCost, cardArray[eachCard].images)
            playerDeck.push(gameCard)
            playerDeck.push(gameCard)
            playerDeck.push(gameCard)
            playerDeck.push(gameCard)
        }
        return playerDeck;

    }
}

export default Deck

