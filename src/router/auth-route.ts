import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";

const authRoute = express.Router();

authRoute.use(authMiddleware);
export { authRoute };
