import type { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";

export class UserController {
  static async getAllUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await UserService.getAllUser();
      return res.status(200).json({
        statusCode: 200,
        message: "success get user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId as string);
      const result = await UserService.getUserByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
