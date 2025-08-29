/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from "../interface/error";
import httpStatus from "http-status";
const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract field and value
  const duplicateField = Object.keys(err.keyValue)[0]; // e.g., "email"
  const duplicateValue = err.keyValue[duplicateField];

  const errorSources: TErrorSources = [
    {
      path: duplicateField,
      message: `"${duplicateValue}" already exists`,
    },
  ];

  const statusCode = httpStatus.CONFLICT; // 409
  return {
    statusCode,
    message: `Duplicate field ${duplicateField}`,
    errorSources,
  };
};

export default handleDuplicateError;
