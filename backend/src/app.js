const express = require("express");
const cors = require("cors");

const tareasRoutes = require("./routes/tareas.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de lista de tareas funcionando 🚀");
});

app.use("/api/tareas", tareasRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;