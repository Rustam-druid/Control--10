import {IComments, INews} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {fetchAllNews} from "./productsThunks.ts";

interface ProductsState {
    items: INews[];
    onePost: INews | null;
    comments: IComments[]
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: ProductsState = {
    items: [],
    onePost: null,
    comments: [],
    fetchLoading: false,
    createLoading: false,
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


    }
});

export const newsReducer = newsSlice.reducer;

export const selectNews = (state: RootState) => state.posts.items;
export const selectOneNews = (state: RootState) => state.posts.onePost;
export const selectComments = (state: RootState) => state.posts.comments;
export const selectLoading = (state: RootState) => state.posts.fetchLoading;