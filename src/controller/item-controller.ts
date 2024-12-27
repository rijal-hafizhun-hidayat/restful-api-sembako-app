import type { NextFunction, Request, Response } from "express";
import { ItemService } from "../service/item-service";
import type { ItemRequest } from "../model/item-model";

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

  static async storeItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: ItemRequest = req.body as ItemRequest;
      const result = await ItemService.storeItem(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store items",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteItemByItemId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const itemId: number = parseInt(req.params.itemId);
      const result = await ItemService.deleteItemByItemId(itemId);
      return res.status(200).json({
        statusCode: 200,
        message: "success delete item",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getItemByItemId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const itemId: number = parseInt(req.params.itemId);
      const result = await ItemService.getItemByItemId(itemId);
      return res.status(200).json({
        statusCode: 200,
        message: "success get item",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
