import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

//connect to mongoDB
const dbURI = 'mongodb+srv://cox_james:xocsemaj@pokemon0.wlcuscp.mongodb.net/DeckList?retryWrites=true&w=majority&appName=Pokemon0'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => console.log('connected to DB'))
    .catch((err) => console.log(err))

const logSchema = new mongoose.Schema({
    GameId: String,
    TurnsElapsed: Number,
    isOver: Boolean,
    Winner: String
})

const Log = mongoose.model("Log", logSchema)

export function createLog(currentGame){
    console.log(`current game: ${currentGame.isGameOver}`)
    let gameLog = new Log(
        {GameID: currentGame.gameId},
        {TurnsElapsed: currentGame.turnsElapsed},
        {isOver: currentGame.isGameOver},
        {Winner: currentGame.winner}
    )
    console.log(`${gameLog.TurnsElapsed}`)
    console.log(`document: ${gameLog.isOver}`)
    // gameLog.markModified('_id')
    // gameLog.markModified('GameID')
    // gameLog.markModified('TurnsElapsed')
    // gameLog.markModified('isOver')
    // gameLog.markModified('Winner')
    gameLog.save()
        // .then((result) => console.log('saved log'))
        // .catch((err) => console.log(err))
}


export function updateLog(currentGame){

}
