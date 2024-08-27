import express from "express";
import { ItemsController } from "../controller/items-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const apiRoute = express.Router();

apiRoute.use(authMiddleware)
apiRoute.get("/api/items", ItemsController.getAll);
apiRoute.post("/api/items", ItemsController.store);
apiRoute.get("/api/items/:itemsId", ItemsController.findByItemsId);
apiRoute.put("/api/items/:itemsId", ItemsController.updateByItemsId);
apiRoute.delete("/api/items/:itemsId", ItemsController.destroyByItemsId);

export { apiRoute };
