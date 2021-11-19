const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
dotenv.config({ path: "./config.env" });
require("./db/conn");
//const User=require('./model/userSchema');

app.use(express.json());

// we link the router files to make our route easy
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.get("/signin", (req, res) => {
  res.send("Hello world from the server signup");
});
app.get("/service", (req, res) => {
  res.send("Hello world from the server services");
});
app.get("/contact", (req, res) => {
  res.send("Hello world from the server contact");
});
/* app.get("/about", middleware, (req, res) => {
  res.send("Hello world frodasvcm the server about");
}); */

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
