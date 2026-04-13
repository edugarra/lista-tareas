const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectDB() {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;