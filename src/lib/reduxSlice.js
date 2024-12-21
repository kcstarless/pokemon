import { createSlice } from "@reduxjs/toolkit";
import { setLocalstorageItem, getLocalstorageItem } from "./storage";
import { DECK_SIZE } from "./constant";

export const initGameSlice = createSlice(
    {
        name: 'game_setup',
        initialState: { 
            initialized: false,
            loaded: false, 
            started: false,
            progressBar: true,
            gameSize: DECK_SIZE, 
            pool: [],
            music: false,
            sound: false,
        },
        reducers: { 
            setInitialized: (state) => { state.initialized = true },
            setLoaded: (state) => { state.loaded = true },
            setStarted: (state) => { state.started = true },
            setProgressBar: (state, action) => { state.progressBar = action.payload },
            setGameSize: (state, action) => { state.gameSize = action.payload },
            setPool: (state, action) => { state.pool = action.payload },

            resetGameSetup: (state) => {
                state.initialized = true;
                state.loaded = false;
                state.started = false;
                state.progressBar = true;
                state.pool = [];
            },
            toggleMusic: (state) => { state.music = !state.music; },
            toggleSound: (state) => { state.sound = !state.sound; },
        }
    },
);

export const { setInitialized, setLoaded, setStarted, setProgressBar, setGameSize, setPool, resetGameSetup, toggleSound, toggleMusic } = initGameSlice.actions;
export const initGameSliceReducer = initGameSlice.reducer;


export const gameDataSliced = createSlice (
    {
        name: 'game_data',
        initialState: {
            currentScore: 0,
            bestScore:  0, // gets the best score from local storage if it exists. 
            caught: null,
            finished: false,
        },
        reducers: {
            setCurrentScore: (state) => { state.currentScore =  state.currentScore + 1 },
            resetCurrentScore:(state) => { state.currentScore = 0 },
            setBestScore: (state) => { 
                if (state.currentScore > state.bestScore) {
                    state.bestScore = state.currentScore;
                    setLocalstorageItem('best_score', state.currentScore);
                }
            },
            setCaught: (state, action) => { state.caught = action.payload },
            setFinished: (state, action) => { state.finished = action.payload},
            resetGameData: (state) => {
                state.currentScore = 0;
                state.bestScore = getLocalstorageItem('best_score') || 0;
                state.caught = null;
                state.finished = false;
            } 
        }
    }
)

export const { setCurrentScore, resetCurrentScore, setBestScore, setCaught, setFinished, resetGameData } = gameDataSliced.actions;  // Export the actions
export const gameDataReducer = gameDataSliced.reducer;
