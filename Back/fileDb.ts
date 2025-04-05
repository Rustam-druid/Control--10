import {promises as fs} from 'fs';
import {existsSync} from "node:fs";
import { ICommentsWithoutId, INews, INewsWithoutIdAndDatetime} from "./types";
import * as crypto from "node:crypto";

const filename = './db.json';
let data: INews[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(filename)) {
                await fs.writeFile(filename, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(filename);
                data = JSON.parse(fileContent.toString()) as INews[];
            }
        } catch (e) {
            data = [];
            console.error(e);
        }
    },
    async getAllNews() {
        await fileDb.init();
        return data.map(item => ({
            title: item.title,
            id: item.id,
            datetime: item.datetime
        }));
    }, async getAllComments() {
        await fileDb.init();
        return data.map(item => ({
            comments: item.comments
        }));
    },
    async geNewsById(param_id: string) {
        return data.find(p => p.id === param_id);
    },
    async getCommentsByNewsId(newsId: string) {
        const newsItem = data.find(item => item.id === newsId);

        if (!newsItem) {
            throw new Error('News item not found');
        }

        return newsItem.comments || [];
    },
    async geNewsDeleteById(param_id: string) {
        data = data.filter(p => p.id !== param_id);
        await this.save();
        return data;
    },
    async deleteCommentById(newsId: string, commentId: string) {
        const newsItem = data.find(item => item.id === newsId);

        if (!newsItem) {
            throw new Error('News item not found');
        }else{
            newsItem.comments = newsItem.comments.filter(comment => comment.id !== commentId);
        }

        await this.save();
        return newsItem.comments;
    },
    async addNewEntryNews(newEntry: INewsWithoutIdAndDatetime) {
        const newNews = {
            ...newEntry,
            id: crypto.randomUUID(),
            datetime: (new Date()).toISOString(),
            comments:[]

        };
        data.push(newNews);
        await this.save();
        return newNews;
    },
    async addNewComments(newsId: string, comments: ICommentsWithoutId) {
        const newsItem = data.find(item => item.id === newsId);

        const newComments = {
            ...comments,
            id: crypto.randomUUID(),
            idNews:newsId

        };
        if (newsItem){
            newsItem.comments.push(newComments);
        }

        await this.save();
        return newComments;
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data));
    }
};

export default fileDb;