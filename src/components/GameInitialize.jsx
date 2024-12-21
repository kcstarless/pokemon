import { useEffect } from 'react';
import { fetchPokemonData } from '../lib/api';
import { useSelector, useDispatch } from 'react-redux';
import { setInitialized } from '../lib/reduxSlice';
import { setSessionstorageItem, getSessionstorageItem } from '../lib/storage';

import BarLoading from './BarLoading';
import BarSetting from './BarSetting';
import GameHeader from './GameHeader';
import GameSetup from './GameSetup';
import GameMain from './GameMain';

import imagePokeball from '../assets/pokeball.webp';

//** Component for initializing the game.
// - Game is auto initialized after 3 seconds, set state to true.
// - On load makes api call in the background to collect all available pokemons.
// - Checks first if the game is initialized and loads different screen if not.
// - */

const GameInitialize = () => {
    console.log("GameInitialize Rendering...");
    const gameInitialized = useSelector((state) => state.game_setup.initialized);
    const gameLoaded = useSelector((state) => state.game_setup.loaded);
    const gameStarted = useSelector((state) => state.game_setup.started);
    const progressBarActive = useSelector((state) => state.game_setup.progressBar);
    const dispatch = useDispatch();

    const maxPokemon = getSessionstorageItem("pokeData")?.count || null;

    // Set initialized to true after 3 seconds
    useEffect(() => {
        // console.log("game initializing");
        const timer = setTimeout(() => { dispatch(setInitialized()) }, 3000);
        return () => clearTimeout(timer); // Cleanup timer when the components unmounts
    }, [dispatch]);

    // Make Api calls to get maximum pokemon number.
    useEffect (() => {
        if (maxPokemon) { return };
        const apiCall = async () => {
            try {
                const data = await fetchPokemonData(); 
                setSessionstorageItem("pokeData", data);
            } catch (error) {
                console.log(error.message);
            }
        }
        apiCall();
    }, []);

    // Initial loading screen with pokeball image
    if (!gameInitialized) {
        return (
            <div className="loading-screen">
                <img src={imagePokeball} className="img-pokeball" alt="loading-pokeball" />
            </div>
        );
    }

    //* If initialized gamesetup load GameSetup and if started load GameMain components */
    const applyOverlay = (progressBarActive || !gameStarted);
    const loadGameSetup = (gameLoaded && !gameStarted);
    const loadMainGame = (gameStarted && !progressBarActive);

    return (
        <>
            {applyOverlay && <div className='darker-overlay'></div>} 
            {gameStarted && <div className="dark-overlay"></div>} {/**less darker overlay */}
            <GameHeader />
            {loadGameSetup && <GameSetup max={maxPokemon} />}
            {loadMainGame && <GameMain />}
            {progressBarActive ? <BarLoading /> : <BarSetting />}
        </>
    )
}

export default GameInitialize

