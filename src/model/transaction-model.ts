import type { item, transaction_item } from "@prisma/client";

export interface TransactionRequest {
  total: number;
  items: item[];
}

export interface TransactionWithTransactionItemsAndItemResponse {
  id: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  transaction_items: TransactionItemsWithItemResponse[];
}

export interface TransactionItemsWithItemResponse {
  id: number;
  transaction_id: number;
  item_id: number;
  qty: number;
  created_at: Date;
  updated_at: Date;
  item: item;
}

export function toTransactionsResponse(
  transactions: TransactionWithTransactionItemsAndItemResponse[]
): TransactionWithTransactionItemsAndItemResponse[] {
  return transactions.map((transaction) => ({
    id: transaction.id,
    total_price: transaction.total_price,
    created_at: transaction.created_at,
    updated_at: transaction.updated_at,
    transaction_items: transaction.transaction_items.map(
      (transaction_item) => ({
        id: transaction_item.id,
        item_id: transaction_item.item_id,
        transaction_id: transaction_item.transaction_id,
        qty: transaction_item.qty,
        created_at: transaction_item.created_at,
        updated_at: transaction_item.updated_at,
        item: {
          id: transaction_item.item.id,
          name: transaction_item.item.name,
          price: transaction_item.item.price,
          description: transaction_item.item.description,
          created_at: transaction_item.item.created_at,
          updated_at: transaction_item.item.updated_at,
        },
      })
    ),
  }));
}
