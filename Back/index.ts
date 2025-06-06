import express from "express";

import fileDb from "./fileDb";
import cors from "cors";

import fs = require("fs");
import newsRouter from "./routers/news";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use('/newsBook', newsRouter);

const run = async () => {
    if (fs.existsSync('./db.json')) {
        await fileDb.init();
    } else {
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));

