import express from "express";
import patientController from "../controller/patientsController.js";
import upload from "../../utils/cloudinaryConfig.js"


const router = express.Router();

router.route("/")
.get(patientController.getAllPatients)

router.route("/:id")
.put(upload.single("image"), patientController.updatePatient)
.delete(patientController.deletePatient)

export default router;