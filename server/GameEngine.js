import readline from 'readline-sync'
import Player from './Player.js'
import Game from './Game.js'
import Deck from './DeckCreate.js'
import PlayerField from './PlayerField.js'
import Turn from './PlayerTurn.js'
import { turnLoop, drawPhase, turnLoopCommands, printHand, drawCard } from './TurnLoop.js'
import { turnZeroPlayerOne, turnZeroPlayerTwo } from './TurnZero.js'
import { initializeActiveSlot} from './TurnZero.js'
import { damagePhase, getAttackString, getBenchPokes, forceSwap } from './AttackPhase.js'
import { placeCardtoSlot } from './PlaceCardtoSlot.js'
import { v4 as uuidv4 } from 'uuid';
import { createLog, updateLog } from './DatabaseManager.js'
import { cpuHandler, cpuTurnTwo } from './cpuController.js'
import { useItemEffect } from './ItemEffects.js'

let gameId = uuidv4()

let currentGame = new Game(gameId, null, null, 0 , false, null, 0)

export function initializeGame(){
    console.log(`Game has been started`)
    var player1 = new Player(1234, new PlayerField(), new Turn(1234, 'draw', false), 0)
    var player2 = new Player(5678, new PlayerField(), new Turn(5678, 'draw', true), 0)
    currentGame.setPlayer1(player1)
    currentGame.setPlayer2(player2)
    createLog(currentGame)
    initPlayerFields(player1)
    initPlayerFields(player2)
    let returnString = introduction()
    return returnString
}

export function runTurnZeroPlayerOne(){
    let returnString = ""
    let player1 = currentGame.player1
    let playerHandArr = turnZeroPlayerOne(player1)
    return playerHandArr
}
export function runTurnZeroPlayerTwo(){
    let returnString = ""
    let player2 = currentGame.player2
    let playerHandArr = turnZeroPlayerTwo(player2)
    return playerHandArr
}

export function turnZeroActiveSlotPlayerOne(command){
    let returnString = ""
    let player1 = currentGame.player1
    returnString = returnString.concat(initializeActiveSlot(player1, command))
    return returnString
}

export function turnZeroActiveSlotPlayerTwo(command){
    let returnString = ""
    let player2 = currentGame.player2
    returnString = returnString.concat(initializeActiveSlot(player2, command))
    return returnString
}

export function getTurnCommands(){
    let returnString = ''
    var player = getActivePlayer()
    returnString = returnString.concat(`It about to be player ${player.playerID}'s turn...`)
    returnString = returnString.concat("Available Options are: play turn, skip, or quit")
    return returnString
}

export function getDrawPhase(){
    let returnString = ''
    returnString =  returnString.concat(drawPhase(currentGame))
    return returnString
}

export function getTurnLoopCommands(){
    let returnString = ''
    if (currentGame.turnsElapsed % 2 == 0){
        var player = currentGame.player1
    }
    else{
        var player = currentGame.player2
    }
    returnString = returnString.concat(`It is ${player.playerID}'s turn...`)
    return returnString.concat(turnLoopCommands())
}

export function turnLoopPlayerOne(command){
    let returnString = ''
    if (command == 'play turn'){
        returnString = returnString.concat(turnLoop(currentGame))
        return returnString
    }
    if (command == 'skip'){
        currentGame.incrementTurnsElapsed()
    }
    if (command == 'quit'){
            currentGame.incrementTurnsElapsed()
            currentGame.setIsGameOver(true)
    }
}

export function turnLoopPlayerTwo(command){
    if (command == 'play turn'){
        turnLoop(currentGame)
    }
    if (command == 'skip'){
        currentGame.incrementTurnsElapsed()
    }
    if (command == 'quit'){
            currentGame.incrementTurnsElapsed()
            currentGame.setIsGameOver(true)
    }
}

export function getAttackStringPrompt(){
    let returnString = ''
    returnString = returnString.concat(getAttackString(currentGame))
    return returnString
}

export function getAttackResultsPrompt(attackName){
    currentGame.incrementTurnsElapsed()
    let returnArr = []
    console.log(`attack name: ${attackName}`)
    let currentPlayer = getActivePlayer()
    console.log(`player id: ${currentPlayer.playerID}`)
    returnArr = damagePhase(attackName, currentGame)
    //currentGame.incrementTurnsElapsed()
    if (returnArr[1] == true){
        let currentPlayer = getActivePlayer()
        let knockOutCount = currentPlayer.incrementKnockoutCount()
        if (knockOutCount >= 3){
            endCurrentGame()
            return "Game Over"
        }
    }
    return returnArr
}

export function getPlayerHand(){
    let returnString = ''
    let player = getActivePlayer()
    returnString = returnString.concat(`Player ${player.playerID}... this is your hand: `)
    returnString = returnString.concat(printHand(player))
    return returnString
}

export function getForceSwapPrompt(){
    let returnString = ''
    returnString = returnString.concat(getBenchPokes(currentGame))
    return returnString
}

export function performForceSwap(activeChoice){
    let returnString = ''
    returnString = returnString.concat(forceSwap(currentGame, activeChoice))
    return returnString
}

export function skipPlayerTurn(){
    currentGame.incrementTurnsElapsed()
}

export function sendPlaceCardtoSlot(cardName, location, benchSlot){
    let returnString = ''
    let player = getActivePlayer()
    returnString = returnString.concat(placeCardtoSlot(player, cardName, location, benchSlot))
    return returnString
}

export function runCpuHandler(){
    //currentGame.incrementTurnsElapsed()
    let returnArr = cpuHandler(currentGame)
    updateLog(currentGame)
    return returnArr
}

export function runCpuTurnTwo(){
    //currentGame.incrementTurnsElapsed()
    let returnArr = cpuTurnTwo(currentGame)
    //updateLog(currentGame)
    return returnArr
}


export function getActivePlayer(){
    if (currentGame.turnsElapsed % 2 == 0){
        var player = currentGame.player1
    }
    else{
        var player = currentGame.player2
    }
    return player
}

export function getPlayer1Hand(){
    return currentGame.player1.playerField.hand
}

export function getPlayer1Active(){
    return currentGame.player1.playerField.active
}

export function getPlayer1Bench(){
    return currentGame.player1.playerField.bench
}

export function getPlayer2Hand(){
    return currentGame.player2.playerField.hand
}

export function getPlayer2Active(){
    return currentGame.player2.playerField.active
}

export function getPlayer2Bench(){
    return currentGame.player2.playerField.bench
}

export function usePotion(){
    let activePlayer = getActivePlayer()
    return useItemEffect(activePlayer)
}

export function getTheTurnsElapsed(){
    return currentGame.getTurnsElapsed()
}

export function getDrawnCard(){
    let currentPlayer = getActivePlayer()
    let cardDrawn = drawCard(currentPlayer)
    return cardDrawn
}

export function endCurrentGame(){
    let currentPlayer = getActivePlayer()
    currentGame.setIsGameOver(true)
    currentGame.setWinner(currentPlayer)
    updateLog(currentGame)
    console.log("\nThe game is over!\n")
}

function initPlayerFields(player){
    player.playerField.setPlayerID(player.getPlayerID())
    player.playerField.setBench([])
    player.playerField.setHand([])
    player.playerField.setDeck(new Deck())
    player.playerField.setDiscard([])
    player.playerField.setActive([[]])
}

function introduction(){
    let returnString = ""
    returnString = returnString.concat("Welcome to PokeTCG Prototype...\n")
    returnString = returnString.concat("Important prompts will appear here...\n")
    returnString = returnString.concat("The initial draw phase will now begin...\n")
    returnString = returnString.concat("Press 'Draw' to start...\n")
    return returnString
}

