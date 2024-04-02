import { Card } from "./Card";
import { CardSlot } from "./CardSlot";
const style = {
    height: '12.4rem',
    backgroundColor: 'rgb(256 230 34 / 90%)',
    borderRadius: '15px',
    color: 'white',
    width: '8rem',
    margin: '0.2rem 0rem 0.2rem 0rem',
    padding: '5rem 0rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    borderRadius: '15px'

}
const Active = ({pokemon, playerId}) => {
    return (
    <div style={{...style}} className="position-relative">
        <div className="position-absolute top-100 start-100 title translate-middle-y">ACTIVE</div>
<<<<<<< HEAD
        {pokemon[0] && <Card
                        name = {pokemon[0].name}
                        url={pokemon[0].images?.large}
                        location={"active"}
                        playerId={playerId} />}
=======
        
        <div className="position-absolute top-0 start-0 ">{pokemon[0] && <Card
                        name = {pokemon[0].name}
                        url={pokemon[0].images?.large}
                        location={"active"}
                        supertype= {pokemon[0].supertype}
                        playerId={playerId}
                        currentHp={pokemon[0].currentHp}
                        maxHp={pokemon[0].hp} />}</div>
>>>>>>> cee9a7caad19849e151989aed47776bc059bf534
    </div>
    )
}
export default Active;
