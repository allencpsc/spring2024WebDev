import readline from 'readline-sync'

export function attackPhase(currentGame){
    var gameEndingAttack = false
    if (currentGame.turnsElapsed % 2 == 0){
        var attacker = currentGame.player1
        var defender = currentGame.player2
    }
    else{
        var attacker = currentGame.player2
        var defender = currentGame.player1
    }
    attackerActive = attacker.playerField.active
    defenderActive = defender.playerField.active
    console.log(`${attackerActive[0].name} has attacks...`)
    attackerAttackOptions = attackerActive[0].attacks
    attackerEnergy = attackerActive[1]
    var defenderPoke = defenderActive[0]
    var attackChoice = getAttackChoice(attackerAttackOptions)
    for (let i = 0; i < attackerAttackOptions.length; i++){
        if(attackChoice == attackerAttackOptions[i].name){
            var knockOut = calculateDamage(attackerAttackOptions[i], defenderPoke)
            if (knockOut){
                newActiveCard = forceSwap(defender)
                if(newActiveCard == false){
                    gameEndingAttack = true
                    return gameEndingAttack
                }
                if (currentGame.turnsElapsed % 2 == 0){
                    currentGame.player2.playerField.setActive([newActiveCard, 0])
                }
                else{
                    currentGame.player1.playerField.setActive([newActiveCard, 0])

                }
            }
        }
    }
}

export function getAttackString(currentGame){
    let returnString = ''
    if (currentGame.turnsElapsed % 2 == 0){
        var attacker = currentGame.player1
        var defender = currentGame.player2
    }
    else{
        var attacker = currentGame.player2
        var defender = currentGame.player1
    }
    let attackerActive = attacker.playerField.active
    returnString = returnString.concat(`${attackerActive[0].name} has attacks...`)
    let attackerAttackOptions = attackerActive[0].attacks
    var attackStringArr = []
    for (let i = 0; i < attackerAttackOptions.length; i++){
        returnString = returnString.concat(`Attack: ${attackerAttackOptions[i].name} | Damage: ${attackerAttackOptions[i].damage}... `)
        attackStringArr.push(attackerAttackOptions[i].name)
    }
    return returnString

}

export function damagePhase(attackName, currentGame){
    let knockOut = false
    let returnArr = []
    let returnString = ''
    returnArr[0] = returnString
    returnArr[1] = knockOut
    console.log(currentGame.turnsElapsed)
    if (currentGame.turnsElapsed % 2 == 0){
        var attacker = currentGame.player1
        console.log(`${attacker.playerField.active[0].name}`)
        var defender = currentGame.player2
    }
    else{
        var attacker = currentGame.player2
        console.log(`${attacker.playerField.active[0].name}`)
        var defender = currentGame.player1
    }
    let attackerActive = attacker.playerField.active
    let defenderActive = defender.playerField.active
    var defenderPoke = defenderActive[0]
    let attackerAttackOptions = attackerActive[0].attacks
    for (let i = 0; i < attackerAttackOptions.length; i++){
        if(attackName == attackerAttackOptions[i].name){
            var attack = attackerAttackOptions[i]
        }
    }
    var calculatedHp = defenderPoke.hp - attack.damage
    defenderPoke.setCardHp(calculatedHp)
    if (calculatedHp <= '0'){
        knockOut = true;
        returnArr[1] = knockOut
    }
    else {
        knockOut = false
        returnArr[1] = knockOut
    }
    returnArr[0] = attack
    return returnArr
}

function getAttackChoice(attackerAttackOptions){
    var attackStringArr = []
    for (let i = 0; i < attackerAttackOptions.length; i++){
        console.log(`Attack: ${attackerAttackOptions[i].name} | Damage: ${attackerAttackOptions[i].damage}\n`)
        attackStringArr.push(attackerAttackOptions[i].name)
    }
    var command = readline.question('What attack do you want to choose?\n')
    if (attackStringArr.includes(command)){
        return command
    }
    else{
        console.log(`That attack missed!!!`);
    }
}

function calculateDamage(attack, defenderPoke){
    var calculatedHp = defenderPoke.hp - attack.damage
    defenderPoke.setCardHp(calculatedHp)
    console.log(`${attack.name} does ${attack.damage} damage!`)
    console.log(`${defenderPoke.name} now has ${calculatedHp} HP`)
    if (calculatedHp <= '0'){
        console.log('knockout!!!!')
        var knockOut = true;
        return knockOut
    }
    else {
        console.log('no knockout!!!!')
        var knockOut = false
        return knockOut;
    }
}

export function getBenchPokes(currentGame){
    let returnString = ''
    if (currentGame.turnsElapsed % 2 == 0){
        var defender = currentGame.player1
    }
    else{
        var defender = currentGame.player2
    }
    returnString = returnString.concat(`Available options for Player ${defender.playerID} are: `)
    for(let eachSlot of defender.playerField.bench){
        returnString = returnString.concat(`${eachSlot[0].name}`)
    }
    return returnString
}

export function forceSwap(currentGame, activeChoice){
    let returnString = ''
    if (currentGame.turnsElapsed % 2 == 0){
        var defender = currentGame.player1
    }
    else{
        var defender = currentGame.player2
    }
    let indexSlot = 0;
    for(let eachSlot of defender.playerField.bench){
        indexSlot = indexSlot + 1
        if(activeChoice == eachSlot[0].name){
            returnString = returnString.concat(`${eachSlot[0].name} has been chosen as the active Pokemon`)
            defender.playerField.bench.splice(indexSlot, 1)
        }
    }
    return returnString
}
