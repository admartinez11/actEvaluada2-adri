import express from "express";
import equipmentsController from "../controller/equipmentsController.js";


const router = express.Router();

router.route("/")
.get(equipmentsController.getEquipments)
.post(equipmentsController.insertEquipment )

router.route("/:id")
.put(equipmentsController.updateEquipment)
.delete(equipmentsController.deleteEquipment)

export default router;