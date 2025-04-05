import express from "express";
import { IMessageWithoutIdAndDateTime} from "../types";
import fileDb from "../fileDb";

const messageRouter = express.Router();

messageRouter.post('/', async (req, res) => {
    const {author, message}: IMessageWithoutIdAndDateTime = req.body;

    if (!req.body.message || !req.body.author) {
        res.status(400).send({error: "Invalid message"});
    }
    const newMessage = await fileDb.addMessage({
        author,
        message,
    })

    res.send(newMessage)
})
messageRouter.get('/', async (req, res) => {
    const messages = fileDb.getMessages();
    const queryDateTime = req.query.datetime as string;
    console.log(queryDateTime);

    if (queryDateTime) {
        const date = new Date(queryDateTime);

        if (isNaN(date.getDate())) {
            res.status(400).send({error: "Invalid date"});
        } else {
            const newMessage = fileDb.getMessagesByDateTime(queryDateTime)
            res.send(newMessage)
        }

    } else {
        res.send(messages.reverse())
    }
})


export default messageRouter;
