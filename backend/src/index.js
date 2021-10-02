require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.get("/", (req, res) => {
  return res.send("Hello, World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
});
