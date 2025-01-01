import { array, number, string, z, type ZodType } from "zod";

export class TransactionValidation {
  static readonly itemSchema: ZodType = z.object({
    id: number().int(),
    name: string().min(1),
    price: number().int(),
    created_at: string().datetime(),
    updated_at: string().datetime(),
  });
  static readonly transactionWithItemSchema: ZodType = z.object({
    price: number().int(),
    items: array(TransactionValidation.itemSchema).min(1),
  });
}
