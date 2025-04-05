import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {IMessage, IMessageMutation} from "../../types";

export const getAllMessages = createAsyncThunk<IMessage[], void>(
    'messages/getAllMessages',
    async () => {
        const response = await axiosAPI.get<IMessage[]>('/messages');
        return response.data
    }
)
export const getNewMessages = createAsyncThunk<IMessage[], string>(
    'messages/getNewMessages',
    async (date) => {
        const response = await axiosAPI.get<IMessage[]>('/messages?datetime=' + date);
        return response.data
    }
)
export const addNewMessages = createAsyncThunk<void, IMessageMutation>(
    'messages/addNewMessages',
    async (messageToSend) => {
        await axiosAPI.post<IMessage[]>('/messages', messageToSend);

    }
);
