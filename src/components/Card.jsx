import pokemonBall from '../assets/pokeball.webp';

// Loads individual card and calls back on click
const Card = ({ onCardClick, poke}) => {
    return (
        <div className="card-inner">
            <div className="card-front" onClick={() => onCardClick(poke)}>
                <div className="card-title">{poke.name}</div>
                <img
                    src={poke.sprites?.other['official-artwork'].front_default}
                    alt={poke.name}
                />
            </div>
            <div className="card-back">
                <img src={pokemonBall} alt="pokeball image" className="back-pokeball" />
            </div>
        </div>
    )
}

export default Card;