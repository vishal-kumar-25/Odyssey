

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Changed: Use MongoDB Atlas URL from environment variable
const dbUrl = process.env.ATLASDB_URL;

// Changed: Single Database Connection and Initialization
async function main() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB");
    } catch (err) {
        console.error("Database connection error: ", err);
        return; // Exit if connection fails
    }

    await initDB();
    mongoose.disconnect();
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        initData.data = initData.data.map((obj) => ({ ...obj, owner: "66657747d75daba8fdf6b8f8" }));
        await Listing.insertMany(initData.data);
        console.log("Data was initialized");
    } catch (err) {
        console.error("Data initialization error: ", err);
    }
};

main();








