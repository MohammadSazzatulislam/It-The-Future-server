const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const allProducts = require("./data/Products.json");

app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send({ message: "unauthorization access" });
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      res.status(401).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("All product Api is comming soon");
});

app.get("/products", (req, res) => {
  res.send(allProducts);
});

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.send({ token });
});

app.get("/product/:id", (req, res) => {
  const id = req.params.id;
  const product = allProducts.find((p) => p.id == id);
  res.send(product);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
