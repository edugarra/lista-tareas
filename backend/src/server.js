const app = require("./app");
const connectDB = require("./config/db");
const { port } = require("./config/env");

async function startServer() {
  await connectDB();

  app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en http://0.0.0.0:${port}`);
});
 // app.listen(port, () => {
 //   console.log(`✅ Servidor corriendo en http://localhost:${port}`);
 // });
}

startServer();