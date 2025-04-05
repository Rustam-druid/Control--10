import {IComments, INews} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {createNews, DeleteNews, fetchAllNews, fetchNewById} from "./postsThunks.ts";


interface ProductsState {
    items: INews[];
    onePost: INews | null;
    comments: IComments[]
    fetchLoading: boolean;
    createLoading: boolean;
    delete:boolean;
    deleteLoading:boolean
}

const initialState: ProductsState = {
    items: [],
    onePost: null,
    comments: [],
    fetchLoading: false,
    createLoading: false,
    delete:false,
    deleteLoading:false,
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllNews.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllNews.fulfilled, (state, {payload: news}) => {
                state.items = news;
                state.fetchLoading = false;
            })
            .addCase(fetchAllNews.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchNewById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchNewById.fulfilled, (state, {payload: post}) => {
                state.onePost = post;
                state.fetchLoading = false;
            })
            .addCase(fetchNewById.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(createNews.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createNews.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createNews.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(DeleteNews.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(DeleteNews.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(DeleteNews.rejected, (state) => {
                state.deleteLoading = false;
            })


    }
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.posts.items;
export const selectOneNews = (state: RootState) => state.posts.onePost;
export const selectComments = (state: RootState) => state.posts.comments;
export const selectLoading = (state: RootState) => state.posts.fetchLoading;
export const selectAddLoading = (state: RootState) => state.posts.createLoading;