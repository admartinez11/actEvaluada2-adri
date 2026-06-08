import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import patientRoutes from "./src/routes/patients.js";
import registerPatientRoutes from "./src/routes/registerPatients.js";
import loginPatientRoutes from "./src/routes/login.js";
import logoutRoutes from "./src/routes/logout.js";
import specialtyRoutes from "./src/routes/medicalSpecialties.js";
import appointmentRoutes from "./src/routes/appointments.js";
import fileRoutes from "./src/routes/clinicFiles.js";
import equipmentRoutes from "./src/routes/equipments.js";


const app = express();  

app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5173"]
    })
);


app.use(express.json());
app.use(cookieParser());
app.use("/api/patients", patientRoutes);
app.use("/api/registerPatients", registerPatientRoutes);
app.use("/api/loginPatient", loginPatientRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/specialties", specialtyRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/equipments", equipmentRoutes);

export default app;
