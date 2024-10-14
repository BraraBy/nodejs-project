import express from "express";
const app = express();

app.listen(3000, () => {
    console.log("Sever running on port 3000.");
});

app.get("/", (req,res) => {
    res.send("<h1>Hello Bobo</h1>");
});

app.get("/about", (req,res) => {
    res.send("<h1>About Me</h1><p>My name is Guy</p>");
});

app.get("/contact", (req,res) => {
    res.send("<h1>Contact Me</h1><p>Phone: 123456789</p>");
});