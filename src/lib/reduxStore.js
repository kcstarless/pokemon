import { configureStore } from "@reduxjs/toolkit";
import { initGameSliceReducer, gameDataReducer} from "./reduxSlice";

const store = configureStore({
    reducer: { 
        game_setup: initGameSliceReducer,
        game_data: gameDataReducer,
    },
});

export default store;