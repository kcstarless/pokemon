import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCaught } from '../lib/reduxSlice';
import { fetchDetailedPokemonData } from '../lib/api';
import { shuffleAndSlicePool, delay } from '../lib/helper';

import Card from './Card';

//* CardList component display current deck of card
//  # Make api call to get detailed info for each pokemons in the deck
//  # Grabs new deck 
//  # Grabs flips card, shuffle and flip back cards for next round 
//  # Calls back to GameMain to check if game should proceed to next round 
//  # Load Card component */

const CardList = ({ handleCardClick }) => {
    // console.log("CardList rendering...");
    const pool = useSelector((state) => state.game_setup.pool); // User selected pool size.
    const dispatch = useDispatch();

    const [currentPool] = useState(pool); // Store currentPool in state
    const [preDeck, setPreDeck] = useState(shuffleAndSlicePool(currentPool)); // Deck before getting details
    const [deck, setDeck] = useState([]);
    const [isFirstDeck, setIsFirstDeck] = useState(true);
    const [flipped, setFlipped] = useState(Array(preDeck.length).fill(false));

    // Fetch individual pokemons details and set it as deck
    useEffect(() => {
        const apiCall = async () => {
            try {
                const detailedDeck = await fetchDetailedPokemonData(preDeck);
                setDeck(detailedDeck);
                setTimeout(() => setIsFirstDeck(false), 1000);
            } catch (error) {
                console.log(error.message);
            }
        };
        apiCall();
    }, [preDeck]);
    
    // Gets new deck
    const getNewDeck = async () => {
        setIsFirstDeck(true);
        await delay(500);
        setPreDeck(shuffleAndSlicePool(currentPool));
        await delay(1200);
        dispatch(setCaught(null));
    }

    // Flip and reshuffle current pool of cards
    const nextRound = async () => {
        // Flip all cards sequentially
        for (let index = 0; index < deck.length; index++) {
            setFlipped(prev => {
                const newFlipped = [...prev];
                newFlipped[index] = true;
                return newFlipped;
            });
            await delay(100);
        }

        await delay(500); // Ensure all cards are flipped before flipping back

        // Prepare new preDeck
        setPreDeck(shuffleAndSlicePool(currentPool));
        await delay(1000);
        // Flip all cards to front sequentially, backwards 
        for (let index = deck.length; index >= 0; index--) {
            setFlipped(prev => {
                const newFlipped = [...prev];
                newFlipped[index] = false;
                return newFlipped;
            });
            await delay(30);
        }
        dispatch(setCaught(null)); // Removes success and defeat image in the header
    }

    // Flips card to back and flips back
    const onCardClick = async (poke) => {
        const continueGame = handleCardClick(poke); // Callback function to GameMain
        
        if (continueGame) {
            nextRound();

        } else {
            getNewDeck(); // New deck from current pool 
        };
    };

    return (
        <div className="card-list">
            {deck.map((poke, index) => (
                <div className={`card ${isFirstDeck ? 'flipped' : flipped[index] ? 'flipped' : ''}`} key={poke.name}>
                    <Card onCardClick={onCardClick} poke={poke} />
                </div>
            ))}
        </div>
    );
};

export default CardList;
