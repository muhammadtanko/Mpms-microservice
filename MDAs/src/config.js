const {
    APP_PORT,
    APP_MONGO_URI,
} = process.env

module.exports = {
    app: {
        port: APP_PORT || 3000,
        mongoUri: APP_MONGO_URI || "mongodb://localhost:27017/mda"
    },
}