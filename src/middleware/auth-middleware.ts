import type { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import type { JwtErrorResponse } from "../interface/jwt-interface";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.get("Authorization") as string;

  if (!token) {
    return res
      .status(401)
      .json({
        data: "unauthorized",
      })
      .end();
  }

  const [type, tokenValue] = token.split(" ");

  Jwt.verify(
    tokenValue,
    process.env.JWT_SECRET as string,
    function (error, decoded) {
      if (decoded) {
        next();
      }

      if (error) {
        res
          .status(401)
          .json({
            data: error as JwtErrorResponse,
          })
          .end();
      }
    }
  );
};
