import filesModel from "../models/clinicFiles.js";

const filesController = {}

filesController.getFiles = async (req, res) => {
    try {
        const files = await filesModel.find(); 
        res.json(files);

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
};

filesController.insertFile = async (req, res) => {
    try{
        const{
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        }= req.body;

        const newFile = new filesModel({
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        });

        await newFile.save();

        return res.status(200).json({message: "File saved"})
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}


filesController.deleteFile = async (req, res) => {
    await filesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Internal server error"})
};

filesController.updateFile = async (req, res) => {
    try {
        const{
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        } = req.body;


        await filesModel.findByIdAndUpdate(
            req.params.id,
            {
                patient_id,
                diagnosis,
                medications,
                medicalNotes
            },
            {new: true}
        );

        return res.status(200).json({message: "File updated"})

    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

export default filesController;
