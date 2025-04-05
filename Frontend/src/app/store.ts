import {configureStore} from "@reduxjs/toolkit";
import {newsReducer} from "../features/News/productsSlice.ts";



export const store = configureStore({
    reducer: {
        posts: newsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;