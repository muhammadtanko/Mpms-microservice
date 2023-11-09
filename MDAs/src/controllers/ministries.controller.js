const ministriesModel = require("../model/ministries.model");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../ministries.json");

class MinistriesController {
  constructor() {}

  async createMinistry(body) {
    try {
      const ministry = new ministriesModel(body);
      let result = await ministry.save();
      return { ok: true, data: result };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getAllMinistries() {
    try {
      const ministries = await ministriesModel.find();

      if (ministries.length == 0) {
        const dataFromJsonFile = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(dataFromJsonFile);

        const mappedData = data.map((item) => ({
          name: item["NAME OF MINISTRY"],
          acronym: item.ACRONYM,
          ministerName: item["HON. MINISTERS"],
          url: item.URL,
          logo: item.LOGO,
        }));

        const res = await ministriesModel.insertMany(mappedData);
        return { ok: true, data: res };
      }
      return { ok: true, data: ministries };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getSingleMinistry(id) {
    try {
      let ministry = await ministriesModel.findById(id);
      return { ok: true, data: ministry };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
}

module.exports = new MinistriesController();
