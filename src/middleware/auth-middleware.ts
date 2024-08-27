import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.get("Authorization")!;

  return res.status(200).json({
    data: token
  })
};
