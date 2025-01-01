import type { NextFunction, Request, Response } from "express";
import type { TransactionRequest } from "../model/transaction-model";
import { TransactionService } from "../service/transaction-service";

export class TransactionController {
  static async storeTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const request: TransactionRequest = req.body as TransactionRequest;
      const result = await TransactionService.storeTransaction(request);
      return res.status(200).json({
        statusCode: 200,
        message: "success store transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
