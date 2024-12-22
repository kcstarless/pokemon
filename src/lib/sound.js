import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { delay } from '../lib/helper';

import shortTitleMusic from '../assets/sounds/short_title.mp3';
import titleMusic from '../assets/sounds/title.mp3';
import battleMusic from '../assets/sounds/battle.mp3';
import intenseMusic from '../assets/sounds/epic_battle.mp3';

import successSound from '../assets/sounds/success.mp3';
import defeatSound from '../assets/sounds/defeat.mp3';
import startSound from '../assets/sounds/its_pikachu.mp3';
import buttonSound from '../assets/sounds/button.mp3';

//** Helper for sound and music
// - Plays sounds for button click and successful and unsuccessful card picks. 
// - Plays music if the music state is true. Different music is played depending on
//   React component currently loaded. */

// Helper function to play type of sounds
export const playSound = async (type, vol = 0.5) => {
    let sound;

    if (type === 'success') { sound = new Audio(successSound); }
    if (type === 'defeat') { sound = new Audio(defeatSound); }
    if (type === 'start') { sound = new Audio(startSound); }
    if (type === 'power') { sound = new Audio(startSound); }
    if (type === 'button') { sound = new Audio(buttonSound); }
    if (type === 'intense') { sound = new Audio(intenseMusic); }

    await sound.play();
    sound.volume = vol;
}

// Custom hook for different types music
export const useMusicToggle = () => {
    const isMusicOn = useSelector((state) => state.game_setup.music);
    const started = useSelector((state) => state.game_setup.started);
    const score = useSelector((state) => state.game_data.currentScore);
    const bestScore = useSelector((state) => state.game_data.bestScore);

    const isBestScore = (score === bestScore);
    
    // Maintain single instances of audio elements
    const shortTitleAudioRef = useRef (new Audio(shortTitleMusic));
    const titleAudioRef = useRef(new Audio(titleMusic));
    const battleAudioRef = useRef(new Audio(battleMusic));
    const intenseAudioRef = useRef(new Audio(intenseMusic));
    const currentMusicRef = useRef(null);  // Track the currently playing audio

    // Function to play music
    const playAudio = async (audio) => {
        try {
            await audio.play();
            audio.loop = true;
            audio.volume = 0.1;
            currentMusicRef.current = audio;
        } catch (error) {
            console.error("Error playing audio", error);
        }
    };

    // Short title music, plays only once
    const playLoadedAudio = async (audio) => {
        try {
            await audio.play();
            await delay(1000);
            audio.volume = 1;
            currentMusicRef.current = audio;
        } catch (error) {
            console.error("Error playing audio", error);
        }
    }
    // Function to stop the currently playing music
    const stopCurrentMusic = () => {
        if (currentMusicRef.current) {
            currentMusicRef.current.pause();
            currentMusicRef.current.currentTime = 0;
            currentMusicRef.current = null;  // Clear the current music reference
        }
    };

    // Dynamically picks the corresponding music
    useEffect(() => {
        const startMusic = async () => {
            if (isMusicOn) {
                stopCurrentMusic(); // Stop any music if it's playing

                if (started) {
                    await delay(2000); 
                    if (isBestScore) {
                        await playAudio(intenseAudioRef.current); // plays different music if current score is best score
                    } else {
                        await playAudio(battleAudioRef.current);
                    }
                    
                } else {
                    await playLoadedAudio(shortTitleAudioRef.current); // Plays once
                    // After short title finishes, play title music
                    await new Promise((resolve) => {
                        shortTitleAudioRef.current.onended = resolve;  // Wait for short title to finish
                    });
                    await playAudio(titleAudioRef.current); // Repeated
                }
            }
        };

        startMusic();

        return () => { stopCurrentMusic(); }; // clean up

    }, [isMusicOn, started, isBestScore]); 

    return {};
};
