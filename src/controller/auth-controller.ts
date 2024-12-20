import type { NextFunction, Request, Response } from "express";
import type { LoginRequest } from "../model/auth-model";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | any> {
    try {
      const request: LoginRequest = req.body as LoginRequest;
      return res.status(200).json({
        data: request,
      });
    } catch (error) {
      next(error);
    }
  }
}
