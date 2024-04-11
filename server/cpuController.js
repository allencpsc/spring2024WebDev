import { damagePhase, getAttackString, getBenchPokes, forceSwap } from './AttackPhase.js'
import { placeCardtoSlot } from './PlaceCardtoSlot.js'


export function cpuHandler(currentGame){
    let returnArr = []
    let player2 = currentGame.player2
    let player2hand = player2.playerField.hand
    returnArr.push(placeRandomCardtoActive(player2))
    returnArr.push(placeRandomCardtoBench(player2))
    let player2active = player2.playerField.active
    //random attack returns an array, needs to be handled as such
    //index 0 is attack, index 1 is knockout bool
    let attackReturnArray = useRandomAttack(player2active, currentGame)
    if (attackReturnArray[1] == true){
        console.log(returnArr)
        returnArr.push(placeRandomCardtoActive(player2))
    }
    returnArr.push(attackReturnArray[0])
    //return arr will have [active, bench, attackChosen]
    return returnArr
}

function placeRandomCardtoActive(player2){
    //placeCard function looks like this placeCardtoSlot(player, cardName, location, benchSlot)
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
}

function useRandomAttack(player2active, currentGame){
    //remember, slots are arrays
    //attackerActive[0].attacks
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
