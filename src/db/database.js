const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DATABASE =
  "mongodb+srv://ManojKumar:Manojkumar12@cluster0.1etnxll.mongodb.net/productlist?retryWrites=true&w=majority";
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => console.log(err));
