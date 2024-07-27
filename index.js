const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// import verifyToken from "./api/middleware/verifyToken";
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

const verifyToken = (res, req, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "unotherised access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "token is invalid" });
    }
    req.decoded = decoded;
    next();
  });
};

app.get("/", verifyToken, (req, res) => {
  res.send("Hello World!");
});

// console.log("register log", app._router.stack)
app.listen(PORT, () => {
  console.log(`App started at ${PORT}`);
});
