import appointmentsModel from "../models/appointments.js";

const appointmentsController = {}

appointmentsController.getAppointments = async (req, res) => {
    try {
        const appointments = await appointmentsModel.find(); 
        res.json(appointments);

    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
};

appointmentsController.insertAppointment = async (req, res) => {
    try{
        const{
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        }= req.body;

        const newAppointment = new appointmentsModel({
            patient_id,
            specialty_id,
            appointmentDate,
            reason,
            status,
            observations
        });

        await newAppointment.save();

        return res.status(200).json({message: "Appointment saved"})
    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}


appointmentsController.deleteAppointment = async (req, res) => {
    await appointmentsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Internal server error"})
};

appointmentsController.updateAppointment = async (req, res) => {
    try {
        const{
            specialtyName,
            description,
            isAvailable
        } = req.body;


        await appointmentsModel.findByIdAndUpdate(
            req.params.id,
            {
                specialtyName,
                description,
                isAvailable
            },
            {new: true}
        );

        return res.status(200).json({message: "Appointment updated"})

    }catch(error){
        res.status(500).json({message: "Internal server error"})
    }
}

export default appointmentsController;
