const mongoose = require("mongoose");

module.exports = async () => {
    const dbConn = mongoose.connection;
    dbConn
        .on("connected", () => {
            console.log("mpms microservice connected to mongo");
        })
        .on("error", (error) => {
            console.log(`error connecting to mongo >> ${error.message}`);
        })
        .on("diconnected", () => {
            console.log("disconnected from mongo");
            setTimeout(async () => {
                console.log("reconnecting to mongo");
                await mongoose.connect("mongodb://localhost:27017/mpmsdb")
            }, 5000);
        })
    await mongoose.connect("mongodb://localhost:27017/mpmsdb")
}