export interface TodaySale {
  _sum: {
    total_price: number | null;
  };
}

export interface TodaySaleResponse {
  total_price: number;
}

export interface TodayCountTransactionResponse {
  count_transaction: number;
}

export function toTodaySalesResponse(sale: TodaySale): TodaySaleResponse {
  return {
    total_price: sale._sum.total_price ? sale._sum.total_price : 0,
  };
}

export function toTodayCountTransactionResponse(
  countTransaction: number
): TodayCountTransactionResponse {
  return {
    count_transaction: countTransaction,
  };
}
