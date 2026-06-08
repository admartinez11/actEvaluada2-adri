import mongoose, { Schema, model } from "mongoose";

const filesSchema = new Schema({
    patient_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients"
    },
    diagnosis:{
        type: String
    },
    medications:[{
        medicineName: {type: String}
    }],
    medicalNotes: {
        type: String
    },
},{
    timestamps: true,
    strict: false
})

export default model("files", filesSchema)