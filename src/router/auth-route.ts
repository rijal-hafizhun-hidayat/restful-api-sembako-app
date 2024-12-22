import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { RoleController } from "../controller/role-controller";

const authRoute = express.Router();

authRoute.use(authMiddleware);
authRoute.get("/api/role", RoleController.getAllRoles);
authRoute.post("/api/role", RoleController.storeRole);
authRoute.get("/api/role/:roleId", RoleController.getRoleByRoleId);
authRoute.put("/api/role/:roleId", RoleController.updateRoleByRoleId);
authRoute.delete("/api/role/:roleId", RoleController.deleteRoleByRoleId);

export { authRoute };
