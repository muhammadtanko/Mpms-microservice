const MpmsController = require("../controllers/mpms.controller");
const { Router } = require("express")


module.exports = () => {
    let api = new Router();
    api.get("/:id", async (req, res) => {
        try {
            const id = req.params.id;
            let { ok, data, message } = await MpmsController.getSingleMinistry(id);
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