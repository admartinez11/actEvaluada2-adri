import medicalSpecialtiesModel from "../models/medicalSpecialties.js";

const medicalSpecialtiesController = {}

medicalSpecialtiesController.getSpecialties = async (req, res) => {
    try {
        const specialties = await medicalSpecialtiesModel.find(); 
        res.json(specialties);

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
};

medicalSpecialtiesController.insertSpecialies = async (req, res) => {
    try{
        const{
            specialtyName,
            description,
            isAvailable
        }= req.body;

        const newSpecialty = new medicalSpecialtiesModel({
            specialtyName,
            description,
            isAvailable
        });

        await newSpecialty.save();

        return res.status(200).json({message: "Specialty saved"})
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}


medicalSpecialtiesController.deleteSpecialty = async (req, res) => {
    await medicalSpecialtiesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Internal server error"})
};

medicalSpecialtiesController.updateSpecialty = async (req, res) => {
    try {
        const{
            specialtyName,
            description,
            isAvailable
        } = req.body;


        await medicalSpecialtiesModel.findByIdAndUpdate(
            req.params.id,
            {
                specialtyName,
                description,
                isAvailable
            },
            {new: true}
        );

        return res.status(200).json({message: "Specialty updated"})

    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

export default medicalSpecialtiesController;
