const mongoose = require("mongoose");
const { mongoUri } = require("../config").app


module.exports = async () => {
    const dbConn = mongoose.connection;
    dbConn
        .on("connected", () => {
            console.log("mpms microservice connected to mongo");
        })
        .on("error", (error) => {
            console.log(`error connecting to mongo >> ${error.message}`);
        })
        .on("disconnected", () => {
            console.log("disconnected from mongo");
            setTimeout(async () => {
                console.log("reconnecting to mongo");
                await mongoose.connect(mongoUri)
            }, 5000);
        })
    await mongoose.connect(mongoUri)
}