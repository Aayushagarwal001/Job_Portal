import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "JOB_PORTAL"
    }).then(() => {
        console.log("Connected to MongoDB Database");
    }).catch(err => {
        console.error("Failed to connect to MongoDB Database", err);
    })
}