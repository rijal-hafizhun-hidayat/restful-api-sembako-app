import express from "express";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRoute } from "../router/public-router";

const web = express();

web.use(express.json());
web.use(publicRoute);
web.use(errorMiddleware);

export { web };
