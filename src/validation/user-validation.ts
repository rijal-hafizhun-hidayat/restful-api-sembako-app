import { number, string, z, type ZodType } from "zod";

export class UserValidation {
  static readonly roleSchema: ZodType = z.object({
    id: number().int(),
    name: string().min(1),
    created_at: string().datetime(),
    updated_at: string().datetime(),
  });

  static readonly userWithRoleSchema: ZodType = z.object({
    name: string().min(1).max(100),
    email: string().min(1).max(100),
    password: string().min(1).max(100),
    role: UserValidation.roleSchema,
  });
}
