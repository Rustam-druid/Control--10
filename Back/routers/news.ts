import express from 'express';
import fileDb from "../fileDb";
import {ICommentsWithoutId, INews, INewsWithoutIdAndDatetime} from "../types";


const newsRouter = express.Router();


newsRouter.post('/', async (req, res) => {
    const {title, description}: INewsWithoutIdAndDatetime = req.body;

    if (!title || !description) {
        res.status(400).send({error: 'Invalid title or description'});
    }

    const newEntry = await fileDb.addNewEntryNews({
        title,
        description,
    })
    res.send(newEntry)

});
newsRouter.post('/:id/comments', async (req, res) => {
    const newsId = req.params.id;
    const {author, titleComments}: ICommentsWithoutId = req.body;

    if (!author || !titleComments) {
        res.status(400).send({error: 'Invalid author or titleComments'});
    }

    if (!newsId || newsId.length < 1) {
        res.status(400).send({error: 'Invalid newsId'});
    }

    const newsItem = await fileDb.geNewsById(newsId);
    if (!newsItem) {
        res.status(404).send({error: 'News not found'});
    }

    const newPost = await fileDb.addNewComments(newsId, {
        author,
        titleComments,
    })
    res.send(newPost)

});


newsRouter.get('/', async (req, res) => {
    const newsList = await fileDb.getAllNews();
    res.send(newsList);

});
newsRouter.get('/:id', async (req, res) => {
    const newsList = await fileDb.geNewsById(req.params.id);
    res.send(newsList);
});
newsRouter.get('/comments', async (req, res) => {
    const newsId = req.query.news_id as string;
    let commentsList;

    if (newsId) {
        commentsList = await fileDb.getCommentsByNewsId(newsId);

        if (commentsList.length === 0) {
            res.status(404).send({error: 'No comments found for this news ID'});
        }
    } else {

        commentsList = await fileDb.getAllComments();
    }

    res.send(commentsList.reverse());
});


newsRouter.delete('/:id', async (req, res) => {
    const newsList = await fileDb.geNewsDeleteById(req.params.id);
    res.send(newsList);
})

newsRouter.delete('/comments/:newsId/:commentId', async (req, res) => {
    const newsId = req.params.newsId;
    const commentId = req.params.commentId;
    if (!newsId || newsId.length < 1) {
        res.status(400).send({error: 'Invalid newsId'});
    }
    if (!commentId || commentId.length < 1) {
        res.status(400).send({error: 'Invalid newsId'});
    }

    const updatedComments = await fileDb.deleteCommentById(newsId, commentId);
    res.send(updatedComments);

});


export default newsRouter;