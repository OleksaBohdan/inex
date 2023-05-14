import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/ping', (req, res) => {
  res.send('pong').end();
});

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
