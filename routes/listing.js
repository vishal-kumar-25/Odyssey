const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//Index and Create routes
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, 
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
     );


      //New Route
 router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show,delete and update routes
     router.route("/:id")
    .get( wrapAsync(listingController.showListing ))   //check here by removing the s in showListings
     .put(
         isLoggedIn,
         isOwner,
         upload.single("listing[image]"),
         validateListing, 
         wrapAsync(listingController.updateListing)
        )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.distroyListing)
    );

 

 
 //Edit Route
router.get("/:id/edit", isLoggedIn, listingController.renderEditForm);
 
 module.exports = router;



