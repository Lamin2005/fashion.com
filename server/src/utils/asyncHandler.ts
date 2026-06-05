import { NextFunction, Request, Response } from "express";

const asyncHandler = (
  controllfn: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(controllfn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
