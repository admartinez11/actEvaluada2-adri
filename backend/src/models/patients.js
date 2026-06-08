import { Schema, model } from "mongoose";

const pacientesSchema = new Schema({
    name:{
        type: String
    },
    lastName:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    birthDate:{
        type: Date
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    bloodType:{
        type: String
    },
    phoneEmergencyContacts:[{
        phone: {type: String},
        nameEmergencyContact: {type: String}
    }],
    profilePhoto: {
        type: String
    },
    public_id:{
        type: String
    },
    isVerified:{
        type: Boolean
    },
    loginAttempts:{
        type: Number
    },
    timeOut:{
        type: Date
    },
},{
    timestamps: true,
    strict: false
})

export default model("patients", pacientesSchema)