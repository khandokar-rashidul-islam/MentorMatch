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
        cookies: req.cookies, // ✅ included
      });
      next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(400).json({ success: false, message: err.errors });
    }
  };

export default validateRequest;
