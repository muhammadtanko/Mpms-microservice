const MpmsController = require("../controllers/mpms.controller");
const { Router } = require("express")

let api = new Router();

module.exports = (express) => {
    let api = express.Router();
    api.get("/:acronym", async (req, res) => {
        try {
            const { acronym } = req.params;
            let { ok, data, message } = await MpmsController.getSingleMinistry(acronym);
            if (ok) {
                res.status(201).json({ ok, data })
            } else {
                res.status(500).json({ ok, message })
            }
        } catch (err) {
            res.status(500).json({ ok: false, message: err.message })
        }
    })
    api.post("/", async (req, res) => {
        try {
            const body = req.body;
            const { ok, data, message } = await MpmsController.createMinistry(body);
            if (ok) {
                res.status(201).json({ ok, data })
            } else {
                res.status(500).json({ ok, message })
            }
        } catch (err) {
            res.status(500).json({ ok: false, message: err.message })
        }
    });

    api.get("/", async (req, res) => {
        try {
            const { ok, data, message } = await MpmsController.getAllMinistries();
            if (ok) {
                res.status(201).json({ ok, data })
            } else {
                res.status(500).json({ ok, message })
            }
        } catch (err) {
            res.status(500).json({ ok: false, message: err.message })
        }
    })


    return api;
}