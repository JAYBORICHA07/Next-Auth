import { error } from "console";
import mongoose from "mongoose";

export async function Connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connectd', () =>{
            console.log("mongodb Connected Sucessfully");
        });

        connection.on('error', (error) => {
            console.log("mongofb connection error." + error);
            process.exit();
        })
    } catch (error) {
        console.log("Something went Wrong");
        console.log(error);
    }
}