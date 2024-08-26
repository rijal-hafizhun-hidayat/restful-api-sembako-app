import express from "express";
import { ItemsController } from "../controller/items-controller";

const publicRoute = express.Router();

publicRoute.get("/api/items", ItemsController.getAll);

export { publicRoute };
