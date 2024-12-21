import { getSessionstorageItem } from '../lib/storage';
import { DECK_SIZE } from '../lib/constant';
import store from '../lib/reduxStore'; // Import your store
import { resetGameSetup, resetGameData } from '../lib/reduxSlice'; // Import the resetGameSetup action

// Shuffles the array
export function shuffleArray(array) {
    // Create a shallow copy of the input array to avoid mutation
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Shuffle the copied array
    }

    return newArray; // Return the shuffled copy, not the original
}

// Prepares data
export function preparePool(poolSize) {
    const data = getSessionstorageItem("pokeData").results; 
    const shuffled = shuffleArray(data);
    const slicedShuffled = shuffled.slice(0, poolSize);

    return slicedShuffled;
}

// Shuffles pool and slice to deck size
export function shuffleAndSlicePool(pooled) {
    const shuffled = shuffleArray(pooled);
    const slicedShuffled = shuffled.slice(0, DECK_SIZE);
    return slicedShuffled;
}

// Timeout helper
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Exits game
export function exitGameSequence() {
    console.log("Exit game!");
}

export function resetGame() {
    store.dispatch(resetGameSetup());
    store.dispatch(resetGameData());
    console.log("Game resetted!");
}
