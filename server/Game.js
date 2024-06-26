class Game {
    constructor(gameId, player1, player2, turnsElapsed, isGameOver, winner){
        this.gameId = gameId
        this.player1 = player1
        this.player2 = player2
        this.turnsElapsed = turnsElapsed
        this.isGameOver = isGameOver
        this.winner = winner
    }

    getPlayer1(){
        return this.player1
    }

    getPlayer2(){
        return this.player2
    }

    getTurnsElapsed(){
        return this.turnsElapsed
    }

    getIsGameOver(){
        return this.isGameOver
    }

    getWinner(){
        return this.winner
    }

    setPlayer1(player){
        this.player1 = player
    }

    setPlayer2(player){
        this.player2 = player
    }

    setTurnsElapsed(turnsElapsed){
        this.turnsElapsed = turnsElapsed
    }

    setIsGameOver(isGameOver){
        this.isGameOver = isGameOver
    }

    setWinner(winner){
        this.winner = winner
    }

    incrementTurnsElapsed(){
        this.turnsElapsed = this.turnsElapsed + 1
    }
}

export default Game
