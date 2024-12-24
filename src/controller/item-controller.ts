import type { NextFunction, Request, Response } from "express";
import { ItemService } from "../service/item-service";

export class ItemController {
  static async getAllItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await ItemService.getAllItems();
      return res.status(200).json({
        statusCode: 200,
        message: "success get items",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
