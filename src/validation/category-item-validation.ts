import { string, z, type ZodType } from "zod";

export class CategoryItemValidation {
  static readonly categoryItemRequest: ZodType = z.object({
    name: string().min(1).max(50),
  });
}
