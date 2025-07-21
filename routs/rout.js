import express from "express";
import { addUser, getUsers, isExists } from "../ctrl/userCtrl.js";
import { verifyToken } from "../middleware/tokenMiddle.js";

const router = express.Router();

// router.use(hashePass)
router.get("/", verifyToken, getUsers)
router.post("/signup", addUser);
router.post("/verify", isExists);

export default router;
