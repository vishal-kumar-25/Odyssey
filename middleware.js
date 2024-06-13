const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listings!");
        return  res.redirect("/login");
    }
    next();
};
module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    const currUser = req.user;
    if(!listing.owner.equals(currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    res.redirect(`/listings/${id}`);
    }
   
    next();
}; 


//Middleware to validate listings
module.exports.validateListing = (req, res, next) => {
    console.log(req.body);
    let { error } = listingSchema.validate(req.body);
    if(error) {   
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else {
        next();
    } 
  };

  module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewId } = req.params;
    let listing = await Review.findById(reviewId); 
    if(!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review");
    res.redirect(`/listings/${id}`);
    }
   
    next();
};