import mongoose from "mongoose";

const connectToDatabase = async (databaseUrl, startServer) => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("connected to database");
    startServer();
  } catch (error) {
    console.log("===Error connecting to database====", error);
  }
};
export default connectToDatabase;
