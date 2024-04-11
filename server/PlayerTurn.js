class PlayerTurn {
    constructor(playerID, turnPhase, isOver) {
        this.playerID = playerID
        this.turnPhase = turnPhase
        this.isOver = isOver
    }

    getPlayerID(){
        return this.playerID
    }

    getTurnPhase(){
        return this.turnPhase
    }

    getIsOver(){
        return this.isOver
    }

    setPlayerID(playerID){
        this.playerID = playerID
    }

    setTurnPhase(turnPhase){
        this.turnPhase = turnPhase
    }

    setIsOver(isOver){
        this.isOver = isOver
    }
}

export default PlayerTurn
