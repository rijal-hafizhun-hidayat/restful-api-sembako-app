import { number, string, z, type ZodType } from "zod";

export class ItemsValidation {
  static readonly itemsRequest: ZodType = z.object({
    name: string().min(1).max(100),
    price: number().min(1).int(),
  });
}
