import logoutController from "../controller/logoutController.js";
import express from "express";

const router = express.Router();

router.route("/")
.post(logoutController.logout)

export default router;