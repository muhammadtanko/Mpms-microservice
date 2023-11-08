const mpmsModel = require("../model/mpms.model");

class MpmsController {
  constructor() {}

  async createAgency(body) {
    try {
      const agency = new mpmsModel(body);
      let result = await agency.save();
      return { ok: true, data: result };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getAllAgencies() {
    try {
      let agencies = await mpmsModel.find();
      return { ok: true, data: agencies };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }

  async getSingleAgency(id) {
    try {
      let agency = await mpmsModel.findById(id);
      return { ok: true, data: agency };
    } catch (error) {
      return { ok: false, message: error.message };
    }
  }
}

module.exports = new MpmsController();
