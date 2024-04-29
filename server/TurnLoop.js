import readline from 'readline-sync'
import Player from './Player.js'
import { attackPhase } from './AttackPhase.js'
import { placeCardtoSlot } from './PlaceCardtoSlot.js'

export function drawPhase(currentGame){
    let returnString = ""
    if (currentGame.turnsElapsed % 2 == 0){
        var player = currentGame.player1
    }
    else{
        var player = currentGame.player2
    }
    returnString = returnString.concat(`It is ${player.playerID}'s turn...`)
    returnString = returnString.concat(drawCard(player))
    returnString = returnString.concat('This is your hand... ')
    returnString = returnString.concat(printHand(player));
    return returnString
}

export function turnLoopCommands(){
    let returnString = ''
    returnString = returnString.concat('Available commands are "play card" and "attack"')
    return returnString
}

export function turnLoop(currentGame){
    let returnString = ""
        if (currentGame.turnsElapsed % 2 == 0){
            var player = currentGame.player1
        }
        else{
            var player = currentGame.player2
        }
        returnString = returnString.concat(`It is ${player.playerID}'s turn...`)
        returnString = returnString.concat(drawCard(player))
        returnString = returnString.concat('This is your hand... ')
        returnString = returnString.concat(printHand(player));
        return returnString
    }

   export function drawCard(player){
        let currPlayerDeck = player.playerField.deck.cardList
        let randomNum = Math.floor(Math.random() * (currPlayerDeck.length -1))
        let randCardFromDeck = currPlayerDeck[randomNum]
        player.playerField.appendHand(currPlayerDeck[randomNum])
        currPlayerDeck.splice(randomNum, 1)
        return randCardFromDeck
    }

    export function printHand(player){
        var returnString = '';
        for (let i = 0; i < player.playerField.hand.length; i ++){
        returnString = returnString.concat(player.playerField.hand[i].name)
        if (i < player.playerField.hand.length -1){
            returnString = returnString.concat(', ');
        }
        }
        return returnString
    }


