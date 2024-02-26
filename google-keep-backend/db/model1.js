const mongoose = require("mongoose");
const clientschema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});
module.exports = mongoose.model("clients", clientschema);
