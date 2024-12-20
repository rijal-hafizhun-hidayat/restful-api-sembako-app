import type { user } from "@prisma/client";
import Jwt from "jsonwebtoken";

export class TokenUtils {
  static async generateToken(user: user): Promise<string> {
    try {
      const token = Jwt.sign(
        {
          userId: user.id,
        },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      );

      return token;
    } catch (error) {
      console.error("Error generating token:", error);
      throw new Error("Could not generate token.");
    }
  }
}
