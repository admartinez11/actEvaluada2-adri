import mongoose from "mongoose";
import { config } from "./config.js";

mongoose.connect(config.db.URI);

const connection= mongoose.connection;

connection.on ("open", () =>{
    console.log("DB is connected")
})

connection.on ("disconnected", (error) =>{
    console.log("DB is disconnected" + error)
})

connection.on ("error", (error) =>{
    console.log("Error found" + error)
})
