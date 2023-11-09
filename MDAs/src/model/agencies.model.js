const { model, Schema } = require("mongoose");

const agencySchema = new Schema({
  name: { type: String },
  acronym: { type: String },
  logo: { type: String },
  url: { type: String },
});

module.exports = model("Agency", agencySchema);
