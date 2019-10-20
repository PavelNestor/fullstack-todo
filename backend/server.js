require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");

const app = express();

const userRoutes = require("./routes/api/users");
const todoRoutes = require("./routes/api/todo");

const { PORT = 4000, SECRET, DB_URL } = process.env;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api/todos", expressJwt({ secret: SECRET }));

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use((err, _req, res) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`[+] Starting server on port ${PORT}`);
});
