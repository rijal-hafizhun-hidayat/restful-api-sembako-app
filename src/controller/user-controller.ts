import type { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import type { UserWithRoleRequest } from "../model/user-model";

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

  static async destroyUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId as string);
      const result = await UserService.destroyUserByUserId(userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: UserWithRoleRequest = req.body as UserWithRoleRequest;
      const result = await UserService.storeUser(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUserByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const userId: number = parseInt(req.params.userId as string);
      const request: UserWithRoleRequest = req.body as UserWithRoleRequest;
      const result = await UserService.updateUserByUserId(request, userId);
      return res.status(200).json({
        statusCode: 200,
        message: "success update user",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
