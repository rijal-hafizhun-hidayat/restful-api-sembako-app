import { string, z, type ZodType } from "zod";

export class AuthValidation {
  static readonly LoginValidation: ZodType = z.object({
    email: string().email(),
    password: string().min(1).max(100),
  });

  static readonly RegisterValidation: ZodType = z.object({
    email: string().email(),
    name: string().min(1).max(100),
    username: string().min(1).max(100),
    password: string().min(1).max(100),
  })
}
