import type { NextFunction, Response } from "express";
import type { CostumeRequest } from "../interface/request-interface";
import { ErrorResponse } from "../error/error-response";
import type { DecodedToken } from "../model/auth-model";
import { TokenUtils } from "../utils/token-utils";
import { prisma } from "../app/database";

export const authMiddleware = async (
  req: CostumeRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new ErrorResponse(403, "no token provided");
  }

  const [, tokenValue] = token.split(" ");

  try {
    const decoded: DecodedToken = (await TokenUtils.verifyToken(
      tokenValue
    )) as DecodedToken;
    const userId: number = decoded.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_role: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new ErrorResponse(403, "user not found");
    }

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.user_role?.role,
    };

    req.currentUser = currentUser;
    return next();
  } catch (error: any) {
    let errorMessage = "Token invalid";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Token malformed";
    }

    throw new ErrorResponse(403, errorMessage);
  }
};
