const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.abawfgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(console.log("mongodb is connected"))
  .catch((error) => console.log("this is error", error));

app.get("/", (req, res) => {
  res.send("Hello world");
});

// console.log(process.env.ACCESS_TOKEN_SECRET);

// jwt token generation
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});
const userRoutes = require("./api/router/userRoutes");
app.use("/users", userRoutes);

// console.log("register log", app._router.stack)
app.listen(PORT, () => {
  console.log(`App started at ${PORT}`);
});
