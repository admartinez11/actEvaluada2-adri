import express from "express";
import patientController from "../controller/patientsController.js";


const router = express.Router();

router.route("/")
.get(patientController.getAllPatients)

router.route("/:id")
.put(patientController.updatePatient)
.delete(patientController.deletePatient)

export default router;