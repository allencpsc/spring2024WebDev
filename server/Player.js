class Player {
    constructor(playerID, playerField, turn, knockoutCount) {
        this.playerID = playerID
        this.playerField = playerField
        this.turn = turn
        this.knockoutCount = knockoutCount
    }

    getPlayerID(){
        return this.playerID
    }

    getTurn(){
        return this.turn
    }

    setPlayerID(playerID){
        this.playerID = playerID
    }

    setTurn(turn){
        this.turn = turn
    }

    getKnockoutCount(){
        return this.knockoutCount
    }

    incrementKnockoutCount(){
        this.knockoutCount = this.knockoutCount + 1
        return this.knockoutCount
    }
}

export default Player
