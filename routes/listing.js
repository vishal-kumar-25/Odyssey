const express = require("express");
const router = express.Router();

//Index Route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
       res.render("listings/index.ejs", {allListings});
 });
 
 //New Route
 router.get("/new", (req, res) => {
     res.render("listings/new.ejs");
 });
 
 //Show Route
router.get("/:id", async(req, res) => {
     try{
     let {id} = req.params;
     const listing = await Listing.findById(id).populate("reviews");
     res.render("listings/show.ejs", { listing});
     } catch (err){
         console.error(err);
         res.status(500).send("Error retrieving listing");
     }
 });
 
 //Create Route
router.post("/", async(req, res) => {
  //try{
 const newListing =  new Listing(req.body.listing);
  await newListing.save();
 res.redirect("/listings");
 // } catch (err) {
 //     console.error(err);
 //     res.status(500).send("Error creating listing ");
 // }
 });
 
 //Edit Route
router.get("/listings/:id/edit", async (req, res) => {
 let { id } = req.params;
     const listing = await Listing.findById(id);
     res.render("listings/edit.ejs", { listing});
 });
 
 //Update Route 
 router.put("/listings/:id", async (req, res) => {
     let { id } = req.params;
     await Listing.findByIdAndUpdate(id, {...req.body.listing });
     res.redirect(`/listings/${id}`);
 });
 
 
 //Delete Route
 router.delete("/listings/:id", async (req, res) => {
     let { id } =  req.params;
     let deletedListing =  await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     res.redirect("/listings");
 });
 
module.exports = router;