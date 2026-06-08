import nodemailer from "nodemailer";
import jsonwebtoken from "jsonwebtoken";
import patientModel from "../models/patients.js";
import { config } from "../../config.js";

const registerPatientController = {};

registerPatientController.registerPatient = async (req, res) => {
    const {
        name,
        lastName,
        email,
        password,
        birthDate,
        phone,
        address,
        bloodType,
        phoneEmergencyContacts,
        isVerified
    } = req.body;

    try {
        const existingPatient = await patientModel.findOne({ email });

        if(existingPatient){
            return res.status(400).json({message: "Patient already exists"})
        }

        const passwordHashed = await bcrypt.hash(password, 10);
        const randomNumber = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(
            {
                name,
                lastName,
                email,
                password: passwordHashed,
                birthDate,
                phone,
                address,
                bloodType,
                phoneEmergencyContacts,
                profilePhoto: req.file.path,
                public_id: req.file.filename,
                isVerified
            }, config.JWT.SECRET,
            {
                expiresIn: "15min"
            }
        );

        res.cookie("RegistrationCookie", token, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        constMailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: "Para verificar tu cuenta utiliza este código: " + randomNumber + "Expira en 15 minutos"
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error" + error)
                return res.status(500).json({message: "Error sending email"})
            }
            return res.status(200).json({message: "Email sent"})
        })

    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

registerPatientController.verifyCode = async (req, res) => {
    try{
        const {verificationCodeRequest} = req.body;

        const token = req.cookies.RegistrationCookie;

        const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

        const{
            randomNumber: storedCode,
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified
        } = decoded;

        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({message: "Invalid verification code"})
        }

        const newPatient = new patientModel({
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            bloodType,
            phoneEmergencyContacts,
            profilePhoto,
            isVerified
        });

        await newPatient.save();

        res.clearCookie("RegistrationCookie");
        
        return res.status(200).json({message: "Patient registered"})
        
    }catch(error){
        console.log("error" + error)
        res.status(500).json({message: "Internal server error"})
    }
}


export default registerPatientController;