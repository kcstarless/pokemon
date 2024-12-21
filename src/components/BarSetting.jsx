import { useMusicToggle } from '../lib/sound';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMusic, toggleSound } from '../lib/reduxSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetGame } from '../lib/helper';
import { playSound } from '../lib/sound';

import iconHelp from '../assets/icons/help.svg';
import iconMusicOn from '../assets/icons/music_on.svg';
import iconMusicOff from '../assets/icons/music_off.svg';
import iconSoundOn from '../assets/icons/sound_on.svg';
import iconSoundOff from '../assets/icons/sound_off.svg';
import imageHelp from '../assets/help.png';
import iconPower from '../assets/icons/power.svg';

//* BarSetting component 
//  # Interact with power, help, music and sound icons/buttons 
//  # Play music or sounds based on user selection 
//  # Displays animated help when user click help icon */

const BarSetting = () => {
    const music = useSelector((state) => state.game_setup.music);
    const sound = useSelector((state) => state.game_setup.sound);
    const started = useSelector((state) => state.game_setup.started);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showHelp, setShowHelp] = useState(false);

    useMusicToggle();  // Use custom hoook

    const helpMessage = {
        slider: "Grab N Slide!",
        pick: "No pick 2X!!"
    }

    const handleMusicToggle = () => {
        if (sound) { playSound('button') };
        dispatch(toggleMusic());
    }
    const handleSoundToggle = () => {
        if (!sound) { playSound('button') };
        dispatch(toggleSound());
    }
    const handleHelpClick = () => {
        if (sound) { playSound('button') };
        setShowHelp(prevState => !prevState); 
    }

    const handlePowerClick = () => {
        console.log("power clicked");
        if (sound) { playSound('power') };
        resetGame();
        navigate('/');
    }

    return (
        <div className="game-option-bar">
            <div className="power">
                <img src={iconPower} onClick={handlePowerClick} />
            </div>
            <div className="options">
                {showHelp && <div className="darker-overlay"></div>}
                <div className={`help ${showHelp ? 'show' : ''}`} onClick={handleHelpClick}>
                    <img src={imageHelp} alt="help display" />
                    <div className="help-message">{started ? helpMessage.pick : helpMessage.slider}</div>
                </div>
                <img src={iconHelp} alt="icon help" onClick={handleHelpClick}></img>
                <img src={music ? iconMusicOn : iconMusicOff} alt="music off" onClick={handleMusicToggle}></img>
                <img src={sound ? iconSoundOn : iconSoundOff} alt="sound off" onClick={handleSoundToggle}></img>
            </div>
        </div>
    )
}

export default BarSetting;