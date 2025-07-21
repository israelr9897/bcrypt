import express from "express";
import { hashePass } from "../middelweare/middelPass.js";
import { addUser, isExists } from "../ctrl/userCtrl.js";

const router = express.Router();

// router.use(hashePass)
router.post("/signup", addUser)
router.post("/verify", isExists)

export default router;