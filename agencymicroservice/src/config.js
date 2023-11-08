const {
    APP_PORT,
    APP_MONGO_URI,
} = process.env

module.exports = {
    app: {
        port: APP_PORT || 3000,
        mongoUri: APP_MONGO_URI || "mongodb+srv://ddld93:1234567890@cluster0.fljiocn.mongodb.net"
    },
}