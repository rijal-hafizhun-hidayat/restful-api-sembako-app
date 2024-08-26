import type { NextFunction, Request, Response } from "express";
import { ItemsService } from "../service/items-service";
import type { ItemsRequest } from "../model/items-model";

export class ItemsController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ItemsService.getAll();
      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async store(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ItemsRequest = req.body as ItemsRequest;
      const result = await ItemsService.store(request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async findByItemsId(req: Request, res: Response, next: NextFunction) {
    try {
      const itemsId: number = parseInt(req.params.itemsId);
      const result = await ItemsService.findByItemsId(itemsId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateByItemsId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const itemsId: number = parseInt(req.params.itemsId);
      const request: ItemsRequest = req.body as ItemsRequest;
      const result = await ItemsService.updateByItemsId(itemsId, request);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyByItemsId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const itemsId: number = parseInt(req.params.itemsId);
      const result = await ItemsService.destroyByItemsId(itemsId);

      return res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
