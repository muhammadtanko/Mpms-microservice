require("./connection/mongo.conn")();
require("dotenv").config();
const UPLOADS = __dirname + "/uploads";
const { port } = require("./config").app;

const express = require("express");
const cors = require("cors");

const agenciesRoutes= require("./routes/agencies.routes")
const ministriesRoutes= require("./routes/ministries.routes")
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/agency", agenciesRoutes(UPLOADS));
app.use("/api/v1/ministry", ministriesRoutes(UPLOADS));

app.listen(port, () => {
  console.log("app listening on port: " + port);
});
