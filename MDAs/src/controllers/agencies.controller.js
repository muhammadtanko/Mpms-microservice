const agenciesModel = require("../model/agencies.model");
const jsonFileData = require("../data/agencies.json");

class AgenciesController {
  constructor() {
    this.populateDb();
  }
  async populateDb() {
    const dbData = await agenciesModel.find();

    if (dbData.length == 0) {
      const mappedData = jsonFileData.map((item) => ({
        name: item["NAME"],
        acronym: item.ACRONYM,
        logo: item.LOGO,
        url: item.URL,
      }));
      console.log("mappedData",mappedData);
      const res = await agenciesModel.insertMany(mappedData);
      console.log("response", res);
      return { ok: true, data: res };
    }
  }
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
