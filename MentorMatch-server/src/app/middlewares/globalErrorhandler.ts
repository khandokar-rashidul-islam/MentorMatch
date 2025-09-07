/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../errors/AppError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../interface/error";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Access token expired";
    errorSources = [
      {
        path: "authorization",
        message:
          "Your session has expired. Please refresh your token or log in again.",
      },
    ];
  } else if (err?.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
    errorSources = [
      {
        path: "authorization",
        message: "Invalid or malformed token",
      },
    ];
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;
