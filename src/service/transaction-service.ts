import type { transaction } from "@prisma/client";
import { prisma } from "../app/database";
import type { TransactionWithItemsRequest } from "../model/transaction-item-model";
import {
  toTransactionResponse,
  toTransactionsResponse,
  toTransactionWithTransactionItemsAndItemResponse,
  type TransactionRequest,
  type TransactionWithTransactionItemsAndItemResponse,
} from "../model/transaction-model";
import { FormatUtils } from "../utils/format-utils";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";
import { ErrorResponse } from "../error/error-response";

export class TransactionService {
  static async storeTransaction(request: TransactionRequest): Promise<any> {
    const requestBody: TransactionRequest = Validation.validate(
      TransactionValidation.transactionWithItemSchema,
      request
    );

    const transactionWithItemsRequest: TransactionWithItemsRequest[] =
      FormatUtils.formatItemsRequest(
        requestBody.items,
        requestBody.qty_per_item
      );

    const [storeTransaction] = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          total_price: requestBody.total_price,
          transaction_items: {
            create: transactionWithItemsRequest,
          },
        },
      }),
    ]);

    return storeTransaction;
  }

  static async getAllTransaction(): Promise<transaction[]> {
    const result = await prisma.transaction.findMany();
    return toTransactionsResponse(result);
  }

  static async destroyTransactionByTransactionId(
    transactionId: number
  ): Promise<transaction> {
    const isTransactionExist = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!isTransactionExist) {
      throw new ErrorResponse(404, "transaction not found");
    }

    const [destroyTransaction] = await prisma.$transaction([
      prisma.transaction.delete({
        where: {
          id: transactionId,
        },
      }),
    ]);

    return toTransactionResponse(destroyTransaction);
  }

  static async getAllTransactionWithTransactionItemsAndItem(
    transactionId: number
  ): Promise<TransactionWithTransactionItemsAndItemResponse> {
    const result = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
      include: {
        transaction_items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!result) {
      throw new ErrorResponse(404, "transaction not found");
    }

    return toTransactionWithTransactionItemsAndItemResponse(result);
  }
}
