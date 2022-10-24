const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT ||  5000;

const allProducts = require('./data/Products.json')

app.use(cors());

app.get("/", (req, res) => {
  res.send("All product Api is comming soon");
});


app.get('/products', (req, res) => {
    res.send(allProducts);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
