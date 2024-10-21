import mongoose from "mongoose";

const uri =
  "mongodb+srv://baijaqubits:YEyc4iKmS0tyK8dV@cluster0.njhs6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export async function createDBConnection() {
  const db = await mongoose.connect(uri);

  return db;
}
