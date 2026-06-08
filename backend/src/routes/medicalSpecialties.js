import express from "express";
import medicalSpecialtiesController from "../controller/medicalSpecialtiesController.js";


const router = express.Router();

router.route("/")
.get(medicalSpecialtiesController.getSpecialties)
.post(medicalSpecialtiesController.insertSpecialies )

router.route("/:id")
.put(medicalSpecialtiesController.updateSpecialty)
.delete(medicalSpecialtiesController.deleteSpecialty)

export default router;