import { number, string, z, type ZodType } from "zod";

export class ItemValidation {
  static readonly categorySchema: ZodType = z.object({
    id: number().int(),
    name: string().min(1),
    created_at: string().datetime(),
    updated_at: string().datetime(),
  });

  static readonly itemWithCategorySchema: ZodType = z.object({
    name: string().min(1).max(100),
    price: number().int(),
    description: string().nullish(),
    category: ItemValidation.categorySchema,
  });
}
