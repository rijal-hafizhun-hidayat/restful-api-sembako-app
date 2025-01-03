import type { item } from "@prisma/client";
import type { TransactionWithItemsRequest } from "../model/transaction-item-model";

export class FormatUtils {
  static formatItemsRequest(
    items: item[],
    qtys: number[]
  ): TransactionWithItemsRequest[] {
    if (items.length !== qtys.length) {
      throw new Error("Items and quantities arrays must have the same length.");
    }

    const transactionWithItemRequest: TransactionWithItemsRequest[] = [];
    const date = new Date();

    items.forEach((item, index) => {
      transactionWithItemRequest.push({
        item_id: item.id,
        qty: qtys[index],
        created_at: date,
        updated_at: date,
      });
    });

    return transactionWithItemRequest;
  }
}
