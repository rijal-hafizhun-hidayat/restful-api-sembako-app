import { prisma } from "../app/database";
import {
  toTodayCountTransactionResponse,
  toTodaySalesResponse,
  type TodayCountTransactionResponse,
  type TodaySaleResponse,
} from "../model/dashboard-model";

export class DashboardService {
  static async getAllSalesByToday(): Promise<TodaySaleResponse> {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const result = await prisma.transaction.aggregate({
      _sum: {
        total_price: true,
      },
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return toTodaySalesResponse(result);
  }

  static async getCountAllTransactionByToday(): Promise<TodayCountTransactionResponse> {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const result = await prisma.transaction.count({
      where: {
        created_at: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return toTodayCountTransactionResponse(result);
  }
}
