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
      //await client.close();
    }
  }

  export async function updateLog(currentGame) {
    try{
      const database = client.db('GameLogs');
      const coll = database.collection('MatchResults');

      const filter = { gameId: currentGame.gameId };

      const options = { upsert: true };

      const updateDoc = {
        $set: {
          turnsElapsed : currentGame.turnsElapsed,
          iGameOver: currentGame.isGameOver,
          winner: currentGame.winner
        },
      };

      const result = await coll.updateOne(filter, updateDoc, options)

      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
      );

    } finally {
      await client.close()
    }
  }
