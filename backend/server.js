require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const { PORT = 4000, DB_URL } = process.env;

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
  console.log(`[+] Starting server on port ${PORT}`);
});
