import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosApi.ts";
import {AddCommentArgs, IComments, ICommentsMutation, INews, INewsMutation} from "../../types";


export const fetchAllNews = createAsyncThunk<INews[], void>(
    'news/fetchAllNews',
    async () => {
        const response = await axiosAPI.get<INews[]>('/newsBook');
        return response.data;
    }
);
export const fetchComments = createAsyncThunk<IComments[], void>(
    'news/fetchAllNews',
    async () => {
        const response = await axiosAPI.get<IComments[]>('/newsBook');
        return response.data;
    }
);
export const addNewComment = createAsyncThunk<void, AddCommentArgs>(
    'news/addNewComment',
    async (arg) => {
        const { idNews, comment } = arg;
        await axiosAPI.post<ICommentsMutation>(`/newsBook/${idNews}/comments`, comment);
    }
);

export const fetchNewById = createAsyncThunk<INews, string>(
    'news/fetchNewById',
    async (product_id) => {
        const response = await axiosAPI.get<INews>('/newsBook/' + product_id);
        return response.data || null;
    }
);


export const createNews = createAsyncThunk<void, INewsMutation>(
    'news/createNews',
    async (newPost) => {
        await axiosAPI.post('/newsBook', newPost);
    }
);
export const DeleteNews = createAsyncThunk<void, string>(
    'news/DeleteNews',
    async (idNews) => {

        const response =   await axiosAPI.delete(`/newsBook/${idNews}`);
        return response.data.id;
    }
);