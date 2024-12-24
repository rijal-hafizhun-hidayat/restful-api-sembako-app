import { string, z, type ZodType } from "zod";

export class CategoryValidation {
  static readonly categoryRequest: ZodType = z.object({
    name: string().min(1).max(50),
  });
}
