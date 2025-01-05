import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";
import { AuthController } from "../controller/auth-controller";
import { CategoryController } from "../controller/category-controller";
import { ItemController } from "../controller/item-controller";
import { TransactionController } from "../controller/transaction-controller";
import { DashboardController } from "../controller/dashboard-controller";
import { UserController } from "../controller/user-controller";

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
authRoute.post("/api/item", ItemController.storeItem);
authRoute.get("/api/item/:itemId", ItemController.getItemByItemId);
authRoute.delete("/api/item/:itemId", ItemController.deleteItemByItemId);
authRoute.put("/api/item/:itemId", ItemController.updateItemByItemId);

authRoute.get("/api/transaction", TransactionController.getAllTransaction);
authRoute.post("/api/transaction", TransactionController.storeTransaction);
authRoute.delete(
  "/api/transaction/:transactionId",
  TransactionController.destroyTransactionByTransactionId
);
authRoute.get(
  "/api/transaction/:transactionId/items",
  TransactionController.getAllTransactionWithTransactionItemsAndItem
);

authRoute.get(
  "/api/dashboard/today-sales",
  DashboardController.getAllSalesByToday
);
authRoute.get(
  "/api/dashboard/today-count-transaction",
  DashboardController.getAllCountTransactionByToday
);

authRoute.get("/api/user", UserController.getAllUser);
authRoute.post("/api/user", UserController.storeUser);
authRoute.get("/api/user/:userId", UserController.getUserByUserId);
authRoute.delete("/api/user/:userId", UserController.destroyUserByUserId);
export { authRoute };
