const express = require("express");
const app = express();
const users = require("./routes/user.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");


app.use(session({secret: "mysupersecretstring"}));

app.get("/test", (req, res) => {
    res.send("test successful!");
});

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) => {
    res.cookie("made-in", "India", {signed: true});
    res.send("signed cookie sent");
});



//Route to verfiy the signed cookie
app.get("/verify", ( req, res) => {
  console.log(req.signedCookies);
  res.send("verified");
});

app.get("/getcookies", (req, res) => {
    res.cookie("great", "namaste");
    res.cookie("madeIn", "India");
    res.send("sent you some cookie!");
});

app.get("/greet", (req, res) => {
    let { name = "anonymous" } = req.cookies;
    res.send(`Hi, ${name}`);
});

app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("Hi, I am root");
});

app.use("/users", users);   //we are writing here common path

//Index- Users
app.get("/users", (req, res) => {
    res.send("GET for users");
});

//Show - users
app.get("/users/:id", (req, res) => {
    res.send("GET for show usrs");
});

//POST - users
app.post("/users", (req, res) => {
    res.send("POST for users");
});

//DELETES - users 
app.delete("/users/:id", (req, res) => {
    res.send("DELETE for users id");
});


app.listen(3000, () => {
    console.log("server is listening to port 3000");
});





