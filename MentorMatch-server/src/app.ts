import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/modules/user/user.route';
import cookieParser from "cookie-parser";
const app: Application = express();
//parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());


// application routes
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  const a = 'hello world ';
  res.send(a);
});

export default app;
