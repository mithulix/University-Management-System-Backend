import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../interfaces/common.Interface';
import { IGenericErrorMessage } from '../interfaces/typeError';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    },
  );
  const statusCode = 400;
  return {
    statusCode,
    message: 'validation error',
    errorMessages: errors,
  };
};

export default handleValidationError;
