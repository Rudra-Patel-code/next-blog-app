import mongoose from "mongoose";

let connection: { isConnected: number } = { isConnected: 0 };

export const connectToDb = async () => {
    try {
        if (connection.isConnected === 1) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(
            process.env.MONGO_DATABASE_URL as string
        );
        connection.isConnected = db.connections[0].readyState;

        console.log("New Db Connection");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to connect to db");
    }
};
