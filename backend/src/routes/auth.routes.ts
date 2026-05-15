import express from "express";

import {
  register,
  login,
} from "../controllers/auth.controller";

import { protect } from "../middlewares/auth.middleware";

import { authorizeRoles } from "../middlewares/role.middleware";
import {
  
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/hr",
  protect,
  authorizeRoles("hr", "admin"),
  (req, res) => {
    res.json({
      message: "Welcome HR",
    });
  }
);

router.get(
  "/employee",
  protect,
  authorizeRoles("employee"),
  (req, res) => {
    res.json({
      message: "Welcome Employee",
    });
  }
);


router.post(
  "/forgot-password",
  forgotPassword
);

router.put(
  "/reset-password/:token",
  resetPassword
);
export default router;