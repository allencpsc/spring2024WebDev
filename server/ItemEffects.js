export function useItemEffect(activePlayer){
    let activeSlot = activePlayer.playerField.getActive()
    let activePoke = activeSlot[0]
    let currentCardHp = activePoke.getCardHp()
    var healedHp = parseInt(currentCardHp) + 20
    activePoke.setCardHp(healedHp)
    return healedHp
}
