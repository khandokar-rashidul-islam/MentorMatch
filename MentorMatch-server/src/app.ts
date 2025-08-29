import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
//import globalErrorHandler from './app/middlewares/globalErrorhandler';

const app: Application = express();
//*parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//* application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  const a = "hello world ";
  res.send(a);
});


app.use(globalErrorHandler)

//*Not Found
app.use(notFound);

export default app;
