const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
    type: String,
    required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://unsplash.com/photos/a-person-swimming-over-a-coral-reef-in-the-ocean-tuEtpjghVmg",
        set: (v) => 
        v==="" 
        ? "https://unsplash.com/photos/a-person-swimming-over-a-coral-reef-in-the-ocean-tuEtpjghVmg" 
        : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema); 
module.exports = Listing;









