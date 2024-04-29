import express from 'express'
var app = express();
const port = 3000
import  bodyParser from 'body-parser'
import { getDrawPhase, getTurnCommands, initializeGame, getTurnLoopCommands,
    getAttackStringPrompt, getAttackResultsPrompt, getForceSwapPrompt, skipPlayerTurn,
    getPlayerHand, sendPlaceCardtoSlot, performForceSwap, getActivePlayer,
    getPlayer1Hand, getPlayer1Active, getPlayer2Hand, getPlayer2Active, getPlayer2Bench,
    getPlayer1Bench, getDrawnCard,
    usePotion,
    getTheTurnsElapsed,
    endCurrentGame,
    runCpuTurnTwo} from './GameEngine.js'
import { runTurnZeroPlayerOne, runTurnZeroPlayerTwo } from './GameEngine.js'
import { turnZeroActiveSlotPlayerOne, turnZeroActiveSlotPlayerTwo } from './GameEngine.js'
import { runCpuHandler } from './GameEngine.js';

const dbURI = 'mongodb+srv://cox_james:xocsemaj@pokemon0.wlcuscp.mongodb.net/?retryWrites=true&w=majority&appName=Pokemon0'

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({}))

app.use('/static', express.static('public'))
app.set('view engine', 'ejs')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/introduction', (req, res) => {
    let gamePrompt = initializeGame()
    res.send(gamePrompt)
    console.log(gamePrompt)
})

app.get('/turn-zero/player1', (req, res) => {
    let playerHandArr = runTurnZeroPlayerOne()
    res.send(playerHandArr)

})

app.post('/turn-zero/player1', (req, res) => {
    console.log(req.body.command)
    let gamePrompt = turnZeroActiveSlotPlayerOne(req.body.command)
    res.render('turn-zero-player1.ejs', {"gamePrompt": gamePrompt})
})

app.get('/turn-zero/player2', (req, res) => {
    let playerHandArr = runTurnZeroPlayerTwo()
    res.send(playerHandArr)
})

app.post('/turn-zero/player2', (req, res) => {
    console.log(req.body.command)
    let gamePrompt = turnZeroActiveSlotPlayerTwo(req.body.command)
    res.render('turn-zero-player2.ejs', {"gamePrompt": gamePrompt})
})

app.get('/turn-zero/complete', (req, res) => {
    res.render('turn-zero-complete.ejs')
})

app.get('/pre-turn-commands', (req, res) => {
    let gamePrompt = getTurnCommands()
    res.render('pre-turn-commands.ejs', {"gamePrompt": gamePrompt})
})

app.post('/pre-turn-commands', (req, res) => {
    console.log(req.body.command)
    if(req.body.command == 'play turn'){
        let gamePrompt = getDrawPhase(req.body.command)
        res.render('draw-phase.ejs', {"gamePrompt": gamePrompt})
    }
    else if(req.body.command == 'skip'){
        skipPlayerTurn()
        let gamePrompt = getTurnCommands()
        res.render('pre-turn-commands.ejs', {"gamePrompt": gamePrompt})
    }
    else if(req.body.command == 'quit'){
    }
})

app.get('/turn-loop-commands', (req, res) => {
    let gamePrompt = getTurnLoopCommands()
    res.render('turn-loop-commands', {"gamePrompt": gamePrompt} )
})

app.post('/turn-loop-commands', (req, res) => {
    if((req.body.command == 'attack')){
        let gamePrompt = getAttackStringPrompt()
        res.render('attacker-options.ejs', {"gamePrompt": gamePrompt} )
    }
    if((req.body.command == 'play card')){
        let gamePrompt = getPlayerHand()
        res.render('place-card.ejs', {"gamePrompt": gamePrompt} )
    }
})

app.post('/attacker-options', (req, res) => {
    let promptArr = getAttackResultsPrompt(req.body.command)
    let gamePrompt = promptArr[0]
    let knockoutBool = promptArr[1]
    if (knockoutBool == false){
        res.render('attack-results.ejs', {"gamePrompt": gamePrompt} )
    }
    else{
        let gamePrompt = getForceSwapPrompt()
        res.render('force-swap.ejs', {"gamePrompt": gamePrompt})
    }
})

app.post('/force-swap', (req, res) => {
    let gamePrompt = performForceSwap(req.body.command)
    res.render('force-swap-results', {"gamePrompt": gamePrompt})
})

app.get('/turn-loop-complete', (req, res) => {
    res.render('turn-loop-complete')
})

app.post('/place-card', (req, res) => {
    console.log(req.body.cardName, req.body.location, req.body.benchSlot)
    let gamePrompt = sendPlaceCardtoSlot(req.body.cardName, req.body.location, req.body.benchSlot)
    res.render('place-card.ejs', {"gamePrompt": gamePrompt})
})

app.get('/cpu-turn', (req,res) => {
    skipPlayerTurn()
    let returnArr = runCpuHandler()
    res.send(returnArr)
})

app.get('/get-player', (req, res) => {
    let activePlayer = getActivePlayer()
    res.send(activePlayer)
})

app.get('/player1-hand', (req, res) => {
    let player1Hand = getPlayer1Hand()
    res.send(player1Hand)
})

app.get('/player1-bench', (req, res) => {
    let player1bench = getPlayer1Bench()
    res.send(player1bench)
})

app.get('/player1-active', (req, res) => {
    let player1active = getPlayer1Active()
    res.send(player1active)
})

app.get('/player2-hand', (req, res) => {
    let player2Hand = getPlayer2Hand()
    res.send(player2Hand)
})

app.get('/player2-bench', (req, res) => {
    let player2Bench = getPlayer2Bench()
    res.send(player2Bench)
})

app.get('/player2-active', (req, res) => {
    let player2Active = getPlayer2Active()
    res.send(player2Active)
})

app.get('/use-item-card-potion', (req,res) => {
    let newCardHp = usePotion()
    res.send(newCardHp)
})

app.get('/get-turns-elapsed', (req,res) => {
    let turnsElapsed = getTheTurnsElapsed()
    res.send(String(turnsElapsed))
})

app.get('/cpu-turn-two', (req,res) => {
    //skipPlayerTurn()
    let returnArr = runCpuTurnTwo()
    res.send(returnArr)
})

app.get('/draw-single-card', (req,res) => {
    let cardDrawn = getDrawnCard()
    res.send(cardDrawn)
})

app.get('/swap-cpu-pokemon', (req,res) => {
    let newCPUPoke = getForceSwapCpu()
    res.send(newCPUPoke)
})



app.get('/end-game', (req, res) => {
    endCurrentGame()
    res.send("The game is over")
})

app.listen(port, () => {
    console.log(`Pokemon TCG app listening on port ${port}`)
})
