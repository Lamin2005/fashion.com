import { NextFunction, Request, Response } from "express";

const asyncHandler = (
  controllfn: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(controllfn(req, res, next)).catch(next);
  };
};

export default asyncHandler;