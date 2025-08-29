import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: `Invalid value for ${err.path}: "${err.value}"`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Invalid resource identifier",
    errorSources,
  };
};

export default handleCastError;
