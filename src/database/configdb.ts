import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      process.env["MONGO_DB_HOST"]!,
      { dbName: "test_db" },
    );
    console.log("banco conectado");
  } catch (e) {
    console.error(e);
  }
}
