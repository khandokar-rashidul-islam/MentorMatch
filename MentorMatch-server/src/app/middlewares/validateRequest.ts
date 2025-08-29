import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
     next(err)
    }
  };
  
export default validateRequest;
