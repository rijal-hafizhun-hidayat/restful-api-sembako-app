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

  static async getAllTransaction(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const result = await TransactionService.getAllTransaction();
      return res.status(200).json({
        statusCode: 200,
        message: "success get transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async destroyTransactionByTransactionId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const transactionId: number = parseInt(
        req.params.transactionId as string
      );
      const result = await TransactionService.destroyTransactionByTransactionId(
        transactionId
      );
      return res.status(200).json({
        statusCode: 200,
        message: "success destroy transaction",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}
