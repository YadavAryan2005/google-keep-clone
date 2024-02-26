const mongoose = require("mongoose");
const dataschema = new mongoose.Schema({
  aid: String,
  title: String,
  content: String,
});
module.exports = mongoose.model("datas", dataschema);
