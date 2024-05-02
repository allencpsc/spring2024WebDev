var pokemon = require('pokemontcgsdk');
var fs = require('fs');
const { json } = require('stream/consumers');
var testDict = new Object();

pokemon.configure({apiKey: 'c3d4b99e-95ef-4abc-8ed9-8ea192164fbf'})

const testSetPopulate={
    startPopulate() {
        jsonFormat.start()
        var testDict = {
        bulbaID : "base1-44",
        charID : "base1-46",
        squirID : "base1-63",
        pidgeyID : "base1-57",
        potionID : "base1-94",
        waterEn : "base1-102",
        fireEN : "base1-98",
        grassEn : "base1-99",
        colorlessEN : "base1-96"
        }
        for (var key in testDict){
            var cardID = testDict[key]
            console.log("NEW API CALL".concat(cardID))
            apiCall.pokeapi(cardID)
        }
    }
}

const baseSetPopulate= {
    startPopulate() {
        jsonFormat.start();
        for (let i = 1; i < 103; i++) {
            var setID = 'base1-';
            var cardID =setID.concat(i.toString());
            apiCall.pokeapi(cardID);
        }
    }
}

const apiCall = {
    pokeapi(cardID) {
        pokemon.card.find(cardID)
        .then(card => {
            saveToFile.jayson(card);
        })
    }
}

const saveToFile = {
    jayson(card) {
        var json = JSON.stringify(card, null, 2);
        addCommaJson = json.concat(",");
        fs.appendFile('cardbase.json', addCommaJson, 'utf8', (err) => {
            if (err)
                console.log(err);
            else {
            }
        });
    }
}

const jsonFormat = {
    start() {
        fs.appendFile('cardbase.json', '[', 'utf8', (err) => {
            if (err)
                console.log(err);
            else {
            }
        })
    },
    stop(){
        fs.appendFile('cardbase.json', ']', 'utf8', (err) => {
            if (err)
                console.log(err);
            else {
            }
        })
    }
}

let start = testSetPopulate.startPopulate();
