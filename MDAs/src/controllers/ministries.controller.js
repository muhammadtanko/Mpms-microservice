const ministriesModel = require("../model/ministries.model");
const DatafromJson = require("../data/ministries.json");

class MinistriesController {
  constructor() {
    this.#init();
  }

  async #init() {
    try {
      const res = await this.getAllMinistries();

      if (res.data.length == 0) {
        const mappedData = DatafromJson.map((data) => ({
          name: data.name,
          acronym: data.acronym,
          ministerName: data.minister,
          url: data.url,
          logo: data.logo,
        }));

        await ministriesModel.insertMany(mappedData);
        console.log("ministry>> database populated");

      }
    } catch (error) {
      console.log(error.message);
    }
  }

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
