import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(cors());

export default app;
