import patientModel from "../models/patients.js";
import {v2 as cloudinary} from "cloudinary";

const patientController = {}

patientController.getAllPatients = async (req, res) => {
    try {
        const patients = await patientModel.find()
        res.json(patients)
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

patientController.deletePatient = async (req, res) => {
    try {
        const patientFound = await patientModel.findById(req.params.id)

        await cloudinary.uploader.destroy(patientFound.public_id)

        const driverDeleted = await patientModel.findByIdAndDelete(req.params.id)

        if(!driverDeleted) return res.status(404).json({message: "Patient not found"})
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

patientController.updatePatient = async (req, res) => {
    try {
        const{
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
            phoneEmergencyContacts
        } = req.body;

        const patientFound = await patientModel.findById(req.params.id)

        const updateData = {
            name,
            lastname,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
            phoneEmergencyContacts
        }

        if(req.file){
            await cloudinary.uploader.destroy(patientFound.public_id)

            updateData.profilePhoto = req.file.path
            updateData.public_id = req.file.filename;
        }

        await patientController.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        );

        return res.status(200).json({message: "Patient updated"})

    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

export default patientController;

