import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {IMessage} from "../../types";
import {getAllMessages, getNewMessages} from "./messageThunk";


interface ChatState {
    messages: IMessage[];
    lastMessageDateTime: string | null;
    loading: boolean;
}

const initialState: ChatState = {
    messages: [],
    loading: false,
    lastMessageDateTime: null
};

export const selectAllMessages = (state: RootState) => state.chat.messages;
export const selectLastMessageDateTime = (state: RootState) => state.chat.lastMessageDateTime;
export const selectMessageLoading = (state: RootState) => state.chat.loading;

export const messageSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMessages.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllMessages.fulfilled, (state, {payload: messages}) => {
                state.loading = false
                state.messages = messages

                if (messages.length > 0) {
                    state.lastMessageDateTime = messages[0].datetime
                }
            })
            .addCase(getAllMessages.rejected, (state) => {
                state.loading = false
            })

            .addCase(getNewMessages.pending, (state) => {
                state.loading = true
            })
            .addCase(getNewMessages.fulfilled, (state, {payload: messages}) => {
                state.loading = false
                state.messages = [...messages, ...state.messages]

                if (messages.length > 0) {
                    state.lastMessageDateTime = messages[0].datetime
                }
            })
            .addCase(getNewMessages.rejected, (state) => {
                state.loading = false
            })


    }

});

export const messageReducer = messageSlice.reducer;
