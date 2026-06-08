import express from "express";
import registerPatientController from "../controller/registerPatientsController.js";
import upload from "../../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/")
.post(upload.single("image"), registerPatientController.registerPatient)

router.route("/verifyCodeEmail")
.post(registerPatientController.verifyCode)


export default router;