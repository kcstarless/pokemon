import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStarted, setProgressBar, setGameSize, setPool } from '../lib/reduxSlice';
import { preparePool } from '../lib/helper';
import { playSound } from '../lib/sound';

import Btn from './Btn';
import Slider from '@mui/material/Slider';

//** Component to setup game
// - Load slider and if selected load game start button 
// - Sets game setup states and prepares pokemon pool based on the size on start
//      - started, progressBar, gameSize, pool from initGmeSlice Redux */

const GameSetup = ( {max} ) => {
    console.log("GameSetup Rendering...");
    const [sliderValue, setSliderValue] = useState(null);
    const dispatch = useDispatch();
    const sound = useSelector((state) => state.game_setup.sound);

    // Change font color and size of pokemon size label based on slider value
    const dynamicStyle = {
        color: sliderValue < 300 ? 'green' : sliderValue < 900 ? '#00488D' : 'red', 
        fontSize: `${48 + sliderValue / 40}px`, // Dynamic font size
    }
    // Starts game
    function handleOnClick() {
        if (sound) { playSound('start') };
        dispatch(setStarted());
        dispatch(setProgressBar(true));
        dispatch(setGameSize(sliderValue));
        dispatch(setPool(preparePool(sliderValue)));
        console.log('Starting game');
    }
    
    return (
        <div className="game-load">
            <div className="slider-button-container">
                <div className="pokemon-size-label" style={(sliderValue === null) ? {color: 'white', textShadow: 'none'} : dynamicStyle}>
                    {!sliderValue ? "How many do you want to catch?" : sliderValue}
                </div>

                <Slider className="custom-slider" 
                        min={12} max={max} 
                        color="white" aria-label='Pokemon Size'
                        onChange={(event, newValue) => setSliderValue(newValue)} />

                {sliderValue? <Btn handleOnClick={handleOnClick} /> : <div className="empty-btn"></div> }
            </div>   
        </div>
    );
}

export default GameSetup;