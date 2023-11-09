const { model, Schema } = require("mongoose");

const ministrySchema = new Schema({
  name: { type: String, index: true, require: true },
  acronym: { type: String, require: true },
  ministerName: { type: String },
  url: { type: String },
  logo: { type: String, require: true },
});

module.exports = model("Ministry", ministrySchema);
