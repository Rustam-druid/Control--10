import {promises as fs} from 'fs';

import {existsSync} from "node:fs";
import {IMessage, IMessageWithoutIdAndDateTime} from "./types";


const fileName = './db.json';
let data: IMessage[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(fileName)) {

            }
            const fileContent = await fs.readFile(fileName);
            data = await JSON.parse(fileContent.toString()) as IMessage[];
        } catch (e) {
            console.error(e);
        }
    },
    getMessages() {
        return data.slice(-30)
    },
    getMessagesByDateTime(date: string) {
        let lastMessages: IMessage[] = [];

        data.forEach(m => {
            if (m.datetime > date) lastMessages.push(m);
        })
        return lastMessages
    },
    async addMessage(message: IMessageWithoutIdAndDateTime) {
        const newMessage = {
            ...message,
            id: crypto.randomUUID(),
            datetime: (new Date()).toISOString(),
        } as IMessage;
        data.push(newMessage);
        await this.save()
        return newMessage;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;