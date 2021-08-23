const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoUri");

const connectDB = async () => {
  try {
    // console.log("Db ", db);
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected....");
  } catch (error) {
    console.error("DB connection failed");
    process.exit(1);
  }
};

module.exports = connectDB;
