const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const schemaStructure = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
});

schemaStructure.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    this.conpassword = await bcrypt.hash(this.password, 10);
    next();
  }
});

const products_sort = new mongoose.model("products_sort", schemaStructure);

module.exports = products_sort;
