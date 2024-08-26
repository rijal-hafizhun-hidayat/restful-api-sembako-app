import express from "express";
import { ItemsController } from "../controller/items-controller";

const publicRoute = express.Router();

publicRoute.get("/api/items", ItemsController.getAll);
publicRoute.post("/api/items", ItemsController.store);
publicRoute.get("/api/items/:itemsId", ItemsController.findByItemsId);
publicRoute.put("/api/items/:itemsId", ItemsController.updateByItemsId);
publicRoute.delete("/api/items/:itemsId", ItemsController.destroyByItemsId);

export { publicRoute };
