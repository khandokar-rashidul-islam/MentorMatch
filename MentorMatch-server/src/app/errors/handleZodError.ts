import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    // Only last segment of the path as string
    const field = issue.path[issue.path.length - 1];
    const message =issue.message === "Required" ? `${field} required` : issue.message;

    return {
      path: field, 
      message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: errorSources[0]?.message || "Validation Error",
    errorSources,
  };
};

export default handleZodError;
