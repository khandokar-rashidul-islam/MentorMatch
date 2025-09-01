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
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());

//* application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  const a = "hello world ";
  res.send(a);
});

//Global Error Handler
app.use(globalErrorHandler)

//*Not Found
app.use(notFound);

export default app;
