Link to API endpoints diagram: https://drive.google.com/file/d/1N5rIap962r-OudzURtS6EtFceYIoJPwH/view?usp=sharing

class Card
    //all data types are named from the Pokemon TCG API
    constructor(id, name, supertype, hp, attacks, weaknesses, retreatCost, images)
        //string ""xy1-1""
        this.id = id
        //string "Venusaur"
        this.name = name
        //string "Pokemon"
        this.supertype = supertype
        //int "180"
        this.hp = hp
        //multidimensional array
        //[[name, cost[], damage, text], [name, cost[], damage, text]]
        this.attacks = attacks
        //array - [type, value]
        this.weaknesses = weaknesses
        //array - ["colorless", "colorless"]
        this.retreatCost = retreatCost
        //array - [small png, large png]
        this.images = images

attacks: //multidimensional array
[{name: bubble, cost: 2, damage: 20}, {name:...}]

//this is how you access an attack name...
//attackeractive[0] is the card, .attacks[0] is the attack object, .name/damage/etc access the attribute
//console.log(attackerActive[0].attacks[0].name = ${attackerActive[0].attacks[0].name})

//random attack returns an array, needs to be handled as such
//index 0 is attack, index 1 is knockout bool
let attackReturnArray = useRandomAttack(player2active, currentGame)

cpuHandler() //return arr will have [active, bench, attackChosen]

//bench example: [[squirtle, energy, energy], [charmander, energy], [pidgey]]

gameEngine - performForceSwap(activeChoice) <- string name

attackResultsPrompt - //game prompt at [0], knockout bool at [1]

There is a bug in the CreateCardbase.js file, detailed below
//CANT GET THIS TO WORK RIGHT -----
//NO MATTER WHERE IT IS PLACED, [] OCCURS AT THE BEGINNING OF THE FILE BEFORE THE API CALLS OCCUR
//MANUAL WORK AROUND - AFTER SCRIPT IS RAN, GO INTO FILE AND DELETE LAST COMMA, PLACE CLOSING BRACKET

Endpoints:
cpu-turn returnArr will have [activeCardObject, benchCardObject, attackObject]

posts for this endpoint are not used for full stack version, but just in case:
'/turn-zero/player2' - console.log(req.body) will log body object and the pair { command: Squirtle }
