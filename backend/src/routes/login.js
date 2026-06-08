import express from "express";
import loginpatientController from "../controller/loginPatientsController.js";


const router = express.Router();

router.route("/")
.post(loginpatientController.login)

export default router;