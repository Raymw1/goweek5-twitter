require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use((req, res, next) => {
  req.io = io; // Use in other local
  return next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT} :)`);
});
