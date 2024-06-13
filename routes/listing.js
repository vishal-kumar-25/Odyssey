const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});
const listingController = require("../controllers/listings.js");



//Index and Create routes
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, 
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
     );

      //New Route
 router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show,delete and update routes
     router.route("/:id")
    .get( wrapAsync(listingController.showListings ))
     .put(
         isLoggedIn,
         isOwner,
         validateListing, 
         wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner,
        wrapAsync(listingController.distroyListing)
    );

 

 
 //Edit Route
router.get("/:id/edit", isLoggedIn, listingController.renderEditForm);
 
 module.exports = router;



