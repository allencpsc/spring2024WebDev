import readline from 'readline-sync'
import { useItemEffect } from './ItemEffects.js'
import { placeEnergytoSlot } from './PlaceEnergytoSlot.js'

export function placeCardtoSlot(activePlayer, cardName, location, benchSlot){
    let returnString = ''
    let cardChosen = getCardChoice(activePlayer, cardName)
    let cardType = checkCardChosen(cardChosen)
    if (cardType == "Pokémon"){
        returnString = returnString.concat(placePokemontoSlot(activePlayer, cardChosen, location))
    }
    else if (cardType == "Energy"){
        returnString = returnString.concat(placeEnergytoSlot(activePlayer, cardChosen, location, benchSlot))
    }
    else if (cardType == "Trainer"){
    }
    return returnString
    }

    function getCardChoice(activePlayer, command){
        for(let eachCard of activePlayer.playerField.hand){
            if (command == eachCard.name){
                return eachCard
            }
        }
    }

    function checkCardChosen(cardChosen){
        return cardChosen.supertype
    }

    function placePokemontoSlot(activePlayer, cardChosen, location){
        let returnString = ''
        if (location == "Bench"){
            placePokeCardtoBench(cardChosen, activePlayer)
            returnString = returnString.concat(`${cardChosen.name} has been placed on the bench`)
        }
        else if (location == "Active"){
            placePokeCardtoActive(cardChosen, activePlayer)
            returnString = returnString.concat(`${cardChosen.name} has been placed in the active slot`)
        }
        console.log(returnString)
        return returnString
    }

    function placePokeCardtoBench(cardChosen, activePlayer){
        let benchArr = activePlayer.playerField.getBench()
        let sizeBenchArr = benchArr.length
        console.log("Bench array: " + sizeBenchArr)
        if (sizeBenchArr < 5){
            benchArr.push([cardChosen, []])
            console.log(`${cardChosen.name} has been placed on your bench`)
        }
        else{
            console.log("Sorry your bench is full!")
            benchArr.pop()
            benchArr.push([cardChosen, []])
        }
    }

    function placePokeCardtoActive(cardChosen, activePlayer){
        let benchArr = activePlayer.playerField.getBench()
        let sizeBenchArr = benchArr.length
        if (benchArr < 5){
            let activeSlot = activePlayer.playerField.getActive()
            let buffCard = activeSlot[0]
            activeSlot[0] = cardChosen
            benchArr.push(buffCard)
            console.log(`Added ${cardChosen.name} to the active slot`)
        }
        else{
            console.log("Sorry your bench is full!")
            benchArr.pop()
            benchArr.push([cardChosen, []])
        }

    }

