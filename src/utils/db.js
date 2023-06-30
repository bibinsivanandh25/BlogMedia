import { connect, set } from "mongoose";

const dbConnection = async () => {
  set("strictQuery", true);

  try {
    await connect(process.env.MONGODB_CLOUD_URL);
    console.log("MongoDB Connected ");
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default dbConnection;
