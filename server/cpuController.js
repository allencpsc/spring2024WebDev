import { damagePhase, getAttackString, getBenchPokes, forceSwap } from './AttackPhase.js'
import { placeCardtoSlot } from './PlaceCardtoSlot.js'


export function cpuHandler(currentGame){
    let returnArr = []
    let player2 = currentGame.player2
    let player2hand = player2.playerField.hand
    returnArr.push(placeRandomCardtoActive(player2))
    returnArr.push(placeRandomCardtoBench(player2))
    let player2active = player2.playerField.active
    let attackReturnArray = useRandomAttack(player2active, currentGame)
    if (attackReturnArray[1] == true){
        console.log(returnArr)
        returnArr.push(placeRandomCardtoActive(player2))
    }
    returnArr.push(attackReturnArray[0])
    return returnArr
}

export function cpuTurnTwo(currentGame){
    console.log('cpu turn two ---------')
    currentGame.incrementTurnsElapsed()
    let returnArr = []
    let player2 = currentGame.player2
    let player2active = player2.playerField.active
    returnArr.push(null)
    returnArr.push(player2.playerField.bench[0])
    let attackReturnArray = useRandomAttack(player2active, currentGame)
    if (attackReturnArray[1] == true){

        returnArr[0] == placeRandomCardtoActive(player2)
    }
    returnArr.push(attackReturnArray[0])
    return returnArr
}

export function forceSwapCpu(currentGame){
    let player2 = currentGame.player2
    let player2hand = player2.playerField.hand
    for (let eachCard of player2hand){
        console.log(eachCard)
        if(eachCard.name == "Pidgey"){
            placeCardtoSlot(player2, eachCard.name, "Active", 0)
            return eachCard
        }   
    }
}

function placeRandomCardtoActive(player2){
    for(let eachCard of player2.playerField.hand){
        if (eachCard.supertype == 'Pokémon'){
            placeCardtoSlot(player2, eachCard.name, "Active", 0)
            return eachCard
        }
    }
}

function placeRandomCardtoBench(player2){
    let benchLength = player2.playerField.bench
    for(let eachCard of player2.playerField.hand){
        if (eachCard.supertype == 'Pokémon'){
            placeCardtoSlot(player2, eachCard.name, "Bench", benchLength)
            return eachCard
        }
    }
    return null
}

function useRandomAttack(player2active, currentGame){
    let attacksAvailable = player2active[0].attacks
    console.log(`attacks available: ${attacksAvailable}`)
    for (let attack of attacksAvailable){
        console.log(`attack damage: ${attack.damage}`)
        if (attack.damage > 0){
            let selectedAttack = attack
            console.log(`selected attack name: ${selectedAttack.name}`)
            let returnArr = damagePhase(selectedAttack.name, currentGame)
            console.log(`return arr for random attack: ${returnArr[0]}, ${returnArr[1]}`)
            return returnArr
        }
    }

}
