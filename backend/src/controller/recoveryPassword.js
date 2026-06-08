import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer";
import crypto from "crypto";
import { config } from "../../config.js";
import patientsModel from "../models/patients.js"

const recoveryPasswordController = {}

recoveryPasswordController.requestCode = async (req, res) =>{
    try{
        const{email} = req.body;

        const userFound = await patientsModel.findOne({email});

        if(!userFound){
            return res.status(404).json({message: "User not found"})
        }

        const randomCode = crypto.randomBytes(3).toString("hex");
        const token = jsonwebtoken.sign(
            {email, randomCode, userType: "patient", verified: false},
            config.JWT.SECRET,
            {expiresIn: "15min"}
        );

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const HTMLRecoveryEmail = (code) => {
            return `
            <div>
                <h1> Password Recovery </h1>
                <p> tu código: </p>
                <div> ${code} </div>
            </div> 
            `;
        }

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Código de recuperación de contraseña",
            body: "El código expira en 15min",
            html: HTMLRecoveryEmail(randomCode),
        }

        transporter.SendMail(mailOptions, (error, info) => {
            if(error){
                console.error("Error" + error)
                return res.status(500).json({message: "Error Sending Email"})
            }
        })

        return res.status(200).json({message: "Recovery code sent"})
    }catch(error){
        console.error("Error" + error)
        res.status(500).json({message: "Internal server error"})
    }
};

recoveryPasswordController.verifyCode = async (req, res) =>{
    try{
        const {code} = req.body;
        const token = req.cookie.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Invalid code"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, userType:"patients", verified},
            config.JWT.SECRET,
            {expiresIn: "15min"}
        );

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});
        return res.status(200).json({message: "Code verified succesfully"})

    }catch(error){
        console.error("Error" + error)
        res.status(500).json({message: "Internal server error"})
    }
};

recoveryPasswordController.newPassword = async (req, res) =>{
    try{
        const {newPassword, confirmNewPassword} = req.body;

        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "Password doesnt match"});

            const token = req.cookies.recoveryCookie;
            const decoded = jsonwebtoken.verify(token, config.JWT.SECRET);

            const passwordHash = await bcrypt.hash(newPassword, 10);

            await patientsModel.findOneAndUpdate(
                {email: decoded.email},
                {password: passwordHash},
                {new: true},
            );

            res.clearCookie("recoveryCookie");
            return res.status(200).json({message: "Password updated"})
        }
    }catch(error){
        console.error("Error" + error)
        res.status(500).json({message: "Internal server error"})
    }
};

export default recoveryPasswordController;