import { prisma } from "../app/database";
import type { TransactionRequest } from "../model/transaction-model";
import { TransactionValidation } from "../validation/transaction-validation";
import { Validation } from "../validation/validation";

export class TransactionService {
  static async storeTransaction(
    request: TransactionRequest
  ): Promise<TransactionRequest> {
    const requestBody: TransactionRequest = Validation.validate(
      TransactionValidation.transactionWithItemSchema,
      request
    );

    return requestBody;
  }
}
