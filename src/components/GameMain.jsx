import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentScore, resetCurrentScore, setBestScore, resetGameData, resetGameSetup, setCaught } from '../lib/reduxSlice';
import { playSound } from '../lib/sound';

import CardList from './CardList';

//* Main component 
//  - Loads CardList component.
//  - Provides main game function:
//      # Checks if game is won, resets game and redirect to home screen
//      # Checks if pokemon was previously caught 
//      # Keeps track of pokemons caught */

const GameMain = () => {
    // console.log("GameMain Rendering...");
    const dispatch = useDispatch();
    const caugthPokemons = useRef([]); // Keep track of caught pokemons
    const currentScore = useSelector((state) => state.game_data.currentScore);
    const poolSize = useSelector((state) => state.game_setup.gameSize);
    const sound = useSelector((state) => state.game_setup.sound);
    const replayGameRef = useRef(false); // To reply the game if game is won, reply is with same pokemon pool
    const navigate = useNavigate();

    // Resets game data
    function resetGame() {
        dispatch(resetGameData());
        dispatch(resetGameSetup());
    }

    // Check if all pokemon is caught
    function checkAllCaught() {
        if ((currentScore + 1) === poolSize) {
            const userConfirmed = window.confirm("Congratulations! Good Memory. Increase pokemons?");
            if (userConfirmed) {
                resetGame();
                navigate('/');  // Navigate back to home (loading screen)
            } else {
                replayGameRef.current = true; // Set it to true if user selects no
            }
         }
        return false;
    }

    // Checks if pokemon already caught, if caught return false 
    function checkIfCaught(poke) {
        if (caugthPokemons.current.some(caught => caught.name === poke.name)) {
            caugthPokemons.current = []; // Reset caught pokemons
            dispatch(resetCurrentScore()); // Reset current score
            return false;
        } else {
            caugthPokemons.current.push(poke);
            dispatch(setCurrentScore(1)); // Add one to current score
            dispatch(setBestScore()); // Checks if current score is best score and updates if best score
            return true;
        }
    }

    // Handles Users click event on card
    const handleCardClick = (poke) => {
        if(checkIfCaught(poke)) {
            checkAllCaught(); // If caught check Win condition
            // If 
            if (replayGameRef.current) { 
                caugthPokemons.current = [];
                dispatch(resetCurrentScore());
                replayGameRef.current = false;
                return false 
            };
            if (sound) { playSound('success') }; 
            dispatch(setCaught(true)); // Display success image
            return true;
        } else {
            if (sound) { playSound('defeat') }; 
            dispatch(setCaught(false)); // Display defeat image    
            return false;
        }
    }

    return (
        <>
            <CardList handleCardClick={handleCardClick} />
        </>
    )
}

export default GameMain;