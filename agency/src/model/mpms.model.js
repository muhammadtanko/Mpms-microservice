const { model, Schema } = require("mongoose");

const agencySchema = new Schema({
  name: { type: String, index: true, require: true },
  acronym: { type: String, require: true },
  logo: { type: String, require: true },
});

module.exports = model("Agency", agencySchema);
