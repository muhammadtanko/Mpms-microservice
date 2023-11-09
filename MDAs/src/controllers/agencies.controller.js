const agenciesModel = require("../model/agencies.model");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../agencies.json");
class AgenciesController {
  constructor() { }

  async createAgency(body) {
    try {
      const agency = new agenciesModel(body);
      let result = await agency.save();
      return { ok: true, data: result };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getAllAgencies() {
    try {
      let agencies = await agenciesModel.find();

      if (agencies.length == 0) {
        const JsonData = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(JsonData);

        const mappedData = data.map((item) => ({
          name: item["NAME OF AGENCY"],
          acronym: item.ACRONYM,
          logo: item.LOGO,
          url: item.URL,
        }));
        const res = await agenciesModel.insertMany(mappedData);
        return { ok: true, data: res };
      }
      return { ok: true, data: agencies };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getSingleAgency(id) {
    try {
      let agency = await agenciesModel.findById(id);
      return { ok: true, data: agency };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
}

module.exports = new AgenciesController();
