
const express = require("express");
const router = express.Router();

//Reviews
//Delete Route
router.delete("/listings/:id", async (req, res) => {
    let { id } =  req.params;
    let deletedListing =  await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


// app.use("/listings/:id/reviews");

//Rviews
//post route
router.post("/listings/:id/reviews", async (req, res) => {
    let listing = await Listing.findById(req.params.id);
  let newReview =  new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();


  module.exports = router;