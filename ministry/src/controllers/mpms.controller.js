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
      const ministries = await mpmsModel.find();

      if (ministries.length == 0) {
        const dataFromJsonFile = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(dataFromJsonFile);

        const mappedData = data.map((item) => ({
          name: item["NAME OF MINISTRY"],
          acronym: item.ACRONYM,
          ministerName: item["HON. MINISTERS"],
          url: item.URL,
        }));

        const res = await mpmsModel.insertMany(mappedData);
        return { ok: true, data: res };
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
