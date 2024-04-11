import { Card } from "./Card";
import { CardSlot } from "./CardSlot";
const style = {
    height: '13.4rem',
    backgroundColor: 'rgb(256 230 34 / 90%)',
    borderRadius: '15px',
    color: 'white',
    width: '10rem',
    margin: '0.2rem 0rem 0.2rem 0rem',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    borderRadius: '15px'

}
const Active = ({pokemon, playerId}) => {
    //pokemon[0] ? console.log(pokemon[0].energies) : console.log()
    return (
    <div style={{...style}} className="position-relative">
        <div className="position-absolute top-100 start-100 title translate-middle-y">PLAYER {playerId} ACTIVE</div>
        <div className="">{pokemon[0] && 
                        <Card
                        index={0}
                        name = {pokemon[0].name}
                        url={pokemon[0].images?.large}
                        location={"Active"}
                        supertype= {pokemon[0].supertype}
                        playerId={playerId}
                        currentHp={pokemon[0].hp}
                        maxHp={pokemon[0].hp}
                        energies={pokemon[0].energies} />}</div>
    </div>
    )
}
export default Active;
