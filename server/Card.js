class Card {
    constructor(id, name, supertype, hp, attacks, weaknesses, retreatCost, images){
        this.id = id
        this.name = name
        this.supertype = supertype
        this.hp = hp
        this.maxHp = hp
        this.attacks = attacks
        this.weaknesses = weaknesses
        this.retreatCost = retreatCost
        this.images = images
    }

    getCardId(){
        return this.id;
    }
    getCardName(){
        return this.name;
    }
    getCardSupertype(){
        return this.supertype;
    }
    getCardHp(){
        return this.hp;
    }
    getCardMaxHp(){
        return this.maxHp;
    }
    getCardAttacks(){
        return this.attacks;
    }
    getCardWeaknesses(){
        return this.weaknesses;
    }
    getCardRetreatCost(){
        return this.retreatCost;
    }
    getCardImages(){
        return this.images;
    }

    setCardId(id){
        this.id = id
    }

    setCardName(name){
        this.name = name
    }

    setCardSupertype(supertype){
        this.supertype = supertype
    }

    setCardHp(hp){
        this.hp = hp
    }

    setCardMaxHp(maxHp){
        this.maxHp = maxHp
    }

    setCardAttacks(attacks){
        this.attacks = attacks
    }

    setCardWeaknesses(weaknesses){
        this.weaknesses = weaknesses
    }

    setCardRetreatCost(retreatCost){
        this.retreatCost = retreatCost
    }

    setCardImages(images){
        this.images = images
    }

}

export default Card
