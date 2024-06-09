const express = require("express");
const router = express.Router();




//Index- Users
router.get("/", (req, res) => {
    res.send("GET for users");
})

//Show - users
router.get("/:id", (req, res) => {
    res.send("GET for show usrs");
})

//POST - users
router.post("/", (req, res) => {
    res.send("POST for users");
})

//DELETES - users 
router.delete("/:id", (req, res) => {
    res.send("DELETE for users id");
})

module.exports = router;



