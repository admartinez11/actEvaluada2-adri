import express from "express";
import registerPatientController from "../controller/registerPatientsController.js";


const router = express.Router();

router.route("/")
.post(registerPatientController.registerPatient)

router.route("/verifyCodeEmail")
.post(registerPatientController.verifyCode)


export default router;