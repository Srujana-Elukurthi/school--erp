import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import { ApiResponse } from '../utils/apiResponse';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation Error';
    // Optionally format Zod errors here
  }

  // Log error for debugging
  console.error(`[Error] ${statusCode} - ${message}`, err);

  const response = ApiResponse.error(message, process.env.NODE_ENV === 'development' ? err : undefined);
  res.status(statusCode).json(response);
};
