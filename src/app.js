const dotenv = require("dotenv").config();
const express = require("express");
const databse = require("./db/database");
const document = require("./models/schema");
const products = require("./models/productModel");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const app = express();
const port = process.env.PORT || 8000;
const SECRETE_KEY = "123manokkjdjfjdsfbjgoigjgjkjgreoij";
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const user = new document(req.body);
    let createData = await user.save();
    createData = await createData.toObject();
    delete createData.password;

    jwt.sign({ createData }, SECRETE_KEY, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "something went wrong" });
      }

      res.status(201).send({ createData, token: token });
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

//login
app.post("/loginuser", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await document.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      if (user) {
        jwt.sign({ user }, Secrete_key, (err, token) => {
          if (err) {
            res.status(401).send({ result: "Something went wrong" });
          }

          res.status(201).send({ user, token: token });
        });
      } else {
        res.status(404).send({ result: "No user found" });
      }
    } else {
      res
        .status(401)
        .send({ result: "please Enter valid email address and password" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// app.get("/register", async (req, res) => {
//   try {
//     const getdata = await document.find();
//     res.send(getdata);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

//create products list
app.post("/products", async (req, res) => {
  try {
    const product = new products(req.body);
    const createProduct = await product.save();
    res.send(createProduct);
  } catch (err) {
    console.log(err);
  }
});

//getProduct
app.get("/products", async (req, res) => {
  try {
    const getProduct = await products.find();
    if (getProduct.length > 0) res.send(getProduct);
    else res.send({ result: "no products found" });
  } catch (err) {
    console.log(err);
  }
});

//delete
app.delete("/delete/:_id", async (req, res) => {
  try {
    const _id = req.params._id;
    const result = await products.deleteOne({ _id: _id });
    if (result === Null) {
      res.send("your database is empty");
    } else {
      res.send(result);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//Update
app.get("/update/:_id", async (req, res) => {
  const _id = req.params._id;
  const result = await products.findOne({ _id: _id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No record found" });
  }
});

//Update
app.put("/put/:_id", async (req, res) => {
  const result = await products.updateOne(
    { _id: req.params._id },
    { $set: req.body }
  );

  res.send(result);
});

//search
app.get("/search/:key", async (req, res) => {
  const result = await products.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));
}

app.listen(port, () => {
  console.log(`listining at port ${port}`);
});
