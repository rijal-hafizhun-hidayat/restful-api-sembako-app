import type { NextFunction, Request, Response } from "express";
import { CategoryItemService } from "../service/category-item-service";
import type { CategoryItemRequest } from "../model/category-item-model";

export class CategoryItemController {
  static async getAllCategoryItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await CategoryItemService.getAllCategoryItems();
      return res.status(200).json({
        statusCode: 200,
        message: "success get category items",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async storeCategoryItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: CategoryItemRequest = req.body as CategoryItemRequest;
      const result = await CategoryItemService.storeCategoryItem(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store category items",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
