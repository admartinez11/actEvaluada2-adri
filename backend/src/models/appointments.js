import mongoose, { Schema, model } from "mongoose";

const appointmentsSchema = new Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients"
    },
    specialty_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "medicalSpecialties"
    },
    appointmentDate:{
        type: Date
    },
    reason:{
        type: String
    },
    status:{
        type: String
    },
    observations:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("appointments", appointmentsSchema)