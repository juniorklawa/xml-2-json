import cors from 'cors';
import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
);

app.listen(3333);
