import { prisma } from "../app/database";
import type { TransactionWithItemsRequest } from "../model/transaction-item-model";
import type { TransactionRequest } from "../model/transaction-model";
import { FormatUtils } from "../utils/format-utils";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";

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

    const storeTransaction = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.create({
        data: {
          total_price: requestBody.total_price,
        },
      });

      await prisma.transaction_item.createManyAndReturn({
        data: transactionWithItemsRequest.map((transactionWithItemRequest) => ({
          transaction_id: transaction.id,
          item_id: transactionWithItemRequest.item_id,
          qty: transactionWithItemRequest.qty,
        })),
      });
    });

    return storeTransaction;
  }
}
