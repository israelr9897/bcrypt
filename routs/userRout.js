import express from "express";
import { addUser, decodeMessage, getUsers, login, updateUsername } from "../ctrl/userCtrl.js";
import { verifyToken } from "../middleware/tokenMiddle.js";

const router = express.Router();

// router.use(hashePass)
router.post("/signup", addUser);
router.post("/login", login);
router.use(verifyToken);
router.get("/", getUsers);
router.put("/:id", updateUsername);
router.post("/verify", login);
router.post("/decode-message", decodeMessage)

export default router;
