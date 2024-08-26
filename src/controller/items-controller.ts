import type { NextFunction, Request, Response } from "express";

export class ItemsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        data: true,
      });
    } catch (error) {
      next(error);
    }
  }
}
