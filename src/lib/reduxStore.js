import { configureStore } from "@reduxjs/toolkit";
import { initGameSliceReducer, gameDataReducer} from "./reduxSlice";

// Create a Redux store holding the state of app.
// Its API is { subscribe, dispatch, getState }.
// You can use it with the react-redux Provider to make the store available to your app.

const store = configureStore({
    reducer: { 
        game_setup: initGameSliceReducer,
        game_data: gameDataReducer,
    },
});

export default store;