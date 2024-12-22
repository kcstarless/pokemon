import axios from 'axios';
import { POKEMON_API_URL } from './constant';
import { setSessionstorageItem, getSessionstorageItem } from './storage';

//* API calls to fetch pokemon data */

// Fetch all available pokemons
export const fetchPokemonData = async () => {
    try {
        // If cached in session storage return
        const cachedData = getSessionstorageItem('pokeData');
        if (cachedData) {
            return cachedData;
        }

        const response = await axios(POKEMON_API_URL);
        if (response) {
            setSessionstorageItem('pokeData', response.data);
            return response.data;
        }

    } catch(error) {
        console.error("Error Fetching Pokemon Data: ", error);
    }
}

// Individual pokemon details
export const fetchDetailedPokemonData = async (deck) => {
    try {
        const detailedDeck = deck.map((pokemon) =>
            axios(pokemon.url).then((response) => response.data)
        )
        const detailedPokemons = await Promise.all(detailedDeck);
        return detailedPokemons;
    } catch(error) {
        console.error("Error fetching pokemon details: ", error);
    }
}