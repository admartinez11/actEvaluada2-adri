import equipmentsModel from "../models/equipments.js";

const equipmentsController = {}

equipmentsController.getEquipments = async (req, res) => {
    try {
        const equipments = await equipmentsModel.find(); 
        res.json(equipments);

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
};

equipmentsController.insertEquipment = async (req, res) => {
    try{
        const{
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            location,
            status,
            isAvailable,
        }= req.body;

        const newEquipment = new equipmentsModel({
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            location,
            image: req.file.path,
            public_id: req.file.filename,
            status,
            isAvailable,
        });

        await newEquipment.save();

        return res.status(200).json({message: "Equipment saved"})
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}


equipmentsController.deleteEquipment = async (req, res) => {
    try{
        const equipmentFound = await equipmentsModel.findById(req.params.id)
        await cloudinary.uploader.destroy(equipmentFound.public_id)
        const equipmentDeleted = await equipmentsModel.findByIdAndDelete(req.params.id)

        if(!equipmentDeleted){
            return res.status(404).json({message: "Equipment not found"})
        }
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
};


//fala el update

equipmentsController.updateEquipment = async (req, res) => {
    try {
        const{
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            location,
            status,
            isAvailable,
        } = req.body;

        const  equipmentFound = await equipmentsModel.findById(req.params.id)

        const updateData = {
            equipmentName,
            description,
            brand,
            model,
            purchaseDate,
            maintenanceDate,
            location,
            status,
            isAvailable,
        }

        if(req.file){
            await cloudinary.uploader.destroy(equipmentFound.public_id)
            updateData.image = req.file.path
            updateData.public_id = req.file.filename; 
        }

        await equipmentsModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        );

        return res.status(200).json({message: "Equipment updated"})

    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

export default equipmentsController;
