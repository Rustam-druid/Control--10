import {configureStore} from "@reduxjs/toolkit";
import {messageReducer} from "../features/Chat/messageSlice.ts";



export const store = configureStore({
    reducer: {
        chat: messageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;