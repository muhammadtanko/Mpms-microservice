const mpmsModel = require("../model/mpms.model");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../ministries.json");

class MpmsController {
  constructor() {}

  async createMinistry(body) {
    try {
      const ministry = new mpmsModel(body);
      let result = await ministry.save();
      return { ok: true, data: result };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getAllMinistries() {
    try {
      let ministries = await mpmsModel.find();

      if (ministries.length == 0) {
        return readMinistriesFromFile();
      }
      return { ok: true, data: ministries };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getSingleMinistry(id) {
    try {
      let ministry = await mpmsModel.findById(id);
      return { ok: true, data: ministry };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
}

module.exports = new MpmsController();

async function readMinistriesFromFile() {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    const ministries = JSON.parse(data);

    return { ok: true, data: ministries };
  } catch (error) {
    return { ok: false, message: error.message };
  }
}
