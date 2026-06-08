import express from "express";
import clinicFilesController from "../controller/clinicFilesController.js";


const router = express.Router();

router.route("/")
.get(clinicFilesController.getFiles)
.post(clinicFilesController.insertFile )

router.route("/:id")
.put(clinicFilesController.updateFile)
.delete(clinicFilesController.deleteFile)

export default router;