const AgenciesController = require("../controllers/agencies.controller");
const { Router } = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;

module.exports = (UPLOADS) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fPath = UPLOADS;
      cb(null, fPath);
    },
    filename: function (req, file, cb) {
      const arr = file.originalname.split(".");
      const ext = arr[arr.length - 1];
      const fileUrl = `${uuid().replace(/-/g, "")}.${ext}`;
      const filePath = "/uploads/" + fileUrl;
      req.filePath = filePath;
      cb(null, fileUrl);
    },
  });
  const upload = multer({ storage });
  let api = new Router();

  api.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      let { ok, data, message } = await AgenciesController.getSingleAgency(id);
      if (ok) {
        res.status(201).json({ ok, data });
      } else {
        res.status(500).json({ ok, message });
      }
    } catch (err) {
      res.status(500).json({ ok: false, message: err.message });
    }
  });

  api.post("/", upload.single("logo"), async (req, res) => {
    try {
      const body = req.body;
      body.logo = req.filePath;
      const { ok, data, message } = await AgenciesController.createAgency(body);
      if (ok) {
        res.status(201).json({ ok, data });
      } else {
        res.status(500).json({ ok, message });
      }
    } catch (err) {
      res.status(500).json({ ok: false, message: err.message });
    }
  });

  api.get("/", async (req, res) => {
    try {
      const { ok, data, message } = await AgenciesController.getAllAgencies();
      if (ok) {
        res.status(201).json({ ok, data });
      } else {
        res.status(500).json({ ok, message });
      }
    } catch (err) {
      res.status(500).json({ ok: false, message: err.message });
    }
  });

  return api;
};
