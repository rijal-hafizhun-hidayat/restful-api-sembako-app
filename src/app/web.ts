import express from "express";
import cors from "cors";
import { publicRoute } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";

const web = express();

const corsOrigin = {
  origin: "http://localhost:5173", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};

web.use(cors(corsOrigin));
web.use(express.json());
web.use(publicRoute);
web.use(errorMiddleware);

export { web };
