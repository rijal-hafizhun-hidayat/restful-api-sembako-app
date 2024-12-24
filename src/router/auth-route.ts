import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { AuthController } from "../controller/auth-controller";
import { CategoryController } from "../controller/category-controller";
import { ItemController } from "../controller/item-controller";

const authRoute = express.Router();

authRoute.use(authMiddleware);

authRoute.post("/api/logout", AuthController.logout);
authRoute.get("/api/current-user", AuthController.getCurrentUser);

authRoute.get("/api/role", RoleController.getAllRoles);
authRoute.post("/api/role", RoleController.storeRole);
authRoute.get("/api/role/:roleId", RoleController.getRoleByRoleId);
authRoute.put("/api/role/:roleId", RoleController.updateRoleByRoleId);
authRoute.delete("/api/role/:roleId", RoleController.deleteRoleByRoleId);

authRoute.get("/api/category", CategoryController.getAllCategories);
authRoute.post("/api/category", CategoryController.storeCategory);
authRoute.get(
  "/api/category/:categoryId",
  CategoryController.getCategoryByCategoryId
);
authRoute.put(
  "/api/category/:categoryId",
  CategoryController.updateCategoryByCategoryId
);
authRoute.delete(
  "/api/category/:categoryId",
  CategoryController.deleteCategoryByCategoryId
);

authRoute.get("/api/item", ItemController.getAllItems);
export { authRoute };
