import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";
import patientModel from "../models/patients.js";
import patientController from "./patientsController.js";
import { config } from "../../config.js";

const loginPatientsController = {}

loginPatientsController.login = async (req, res) => {
    const {email, password} = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\:[^\s@]+$/;

    if(!email || !emailRegex.test(email)){
        return res.status(400).json({message: "Correo inválido"});
    }

    try{
        const patientFound = await patientModel.AndOne({email});

        if(!patientFound){
            return res.status(404).json({message: "Patient not found"});
        }

        if (patientFound.timeOut && patientFound.timeOut > Date.now()){
            return res.status(403).json({message: "Cuenta bloqueada"});
        }

        const isMatch = await bcrypt.compare(password,patientFound.password)

        if(!isMatch){
            patientFound.loginAttempts = (patientFound.loginAttempts || 0)+ 1;

            if(patientFound.loginAttempts >= 5){
                patientFound.timeOut = Date.now() + 5 * 60 * 1000;
                patientFound.loginAttempts = 0;
                await patientFound.save ();
                return res.status(403).json({message: "Cuenta bloqueada por multiples intentos fallidos"})
            }

            await patientFound.save();
            
            return res.status(403).json({message: "Credenciales incorrectas"});
        }

        patientFound.loginAttempts = 0;
        patientFound.timeOut = null;

        const token = jsonwebtoken.sign(
            {id: patientFound._id, userType: "Patient"},
            config.JWT.SECRET,
            {expiresIn: "30d"}
        );

        res.cookie("authCookie", token)
        return res.status(200).json({message: "Login exitoso"});
    }catch(error){
        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
    }
};

export default loginPatientsController;