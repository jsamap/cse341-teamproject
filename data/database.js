const dotenv = require("dotenv")
dotenv.config()

const MongoClient = require("mongodb").MongoClient

// Added specific DNS from Cloudflare and Google to avoid local errors
const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

let database

const initDb = async (callback) => {
    if (database) {
        console.log("DB is already initialized.")
        return callback(null, database)
    }
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL)
        database = client
        callback(null, database)
    } catch (err) {
        callback(err)
    }
}

const getDatabase = () => {
    if (!database) {
        throw Error("Database not initialized")
    }
    return database
}

const closeDb = async () => {
    if (!database) {
        console.log("No database connection to close.")
        return
    }
    await database.close()   // <-- closes the MongoClient
    console.log("Database connection closed.")
    database = null
}

module.exports = {
    initDb,
    getDatabase,
    closeDb,
}
