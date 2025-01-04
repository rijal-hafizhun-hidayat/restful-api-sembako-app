import type { NextFunction, Request, Response } from "express";
import { DashboardService } from "../service/dashboard-service";

export class DashboardController {
  static async getAllSalesByToday(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await DashboardService.getAllSalesByToday();
      return res.status(200).json({
        statusCode: 200,
        message: "success get today sales",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllCountTransactionByToday(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await DashboardService.getCountAllTransactionByToday();
      return res.status(200).json({
        statusCode: 200,
        message: "success get today count transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
