import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRoute } from "../router/public-router";
import { authRoute } from "../router/auth-route";

const web = express();

web.use(express.json());
web.use(publicRoute);
web.use(authRoute);
web.use(errorMiddleware);

export { web };
