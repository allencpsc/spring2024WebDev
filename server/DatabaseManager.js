import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from "mongodb"



//connect to mongoDB
const dbURI = 'mongodb+srv://cox_james:xocsemaj@pokemon0.wlcuscp.mongodb.net/DeckList?retryWrites=true&w=majority&appName=Pokemon0'

//mongodb quickstart
const client = new MongoClient(dbURI);

export async function createLog(currentGame) {
    try {
      const database = client.db('GameLogs');
      const coll = database.collection('MatchResults');
      await coll.insertOne({ gameId: currentGame.gameId, turnsElapsed : currentGame.turnsElapsed,
                                iGameOver: currentGame.isGameOver, winner: currentGame.winner });
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  //runDB().catch(console.dir);

//mongoose stuff
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
//     .then((result) => console.log('connected to DB'))
//     .catch((err) => console.log(err))

// const logSchema = new mongoose.Schema({
//     GameId: String,
//     TurnsElapsed: String,
//     isOver: String,
//     Winner: String
// })

// const Log = mongoose.model("Log", logSchema)

// export function createLog(currentGame){
//     console.log(`current game: ${currentGame.isGameOver}`)
//     const gameLog = new Log(
//         {GameID: currentGame.gameId},
//         {TurnsElapsed: currentGame.turnsElapsed},
//         {isOver: currentGame.isGameOver},
//         {Winner: currentGame.winner}
//     )
//     console.log(`${gameLog.TurnsElapsed}`)
//     console.log(`document: ${gameLog.isOver}`)
//     // gameLog.markModified('_id')
//     // gameLog.markModified('GameID')
//     // gameLog.markModified('TurnsElapsed')
//     // gameLog.markModified('isOver')
//     // gameLog.markModified('Winner')
//     gameLog.save()
//         // .then((result) => console.log('saved log'))
//         // .catch((err) => console.log(err))
// }


// export function updateLog(currentGame){

// }
