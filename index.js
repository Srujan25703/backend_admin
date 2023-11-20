// index.js
const express = require("express");
const mongoose = require("mongoose");
const bookRoute = require("./controller/bookRoute");
const contactRoute = require("./controller/contactRoute");
const cancelRoute = require("./controller/cancelRoute");
const authRoute = require("./controller/authRoute"); // Include the authRoute
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://test:12345@cluster0.xedmcjn.mongodb.net/Restaurantdb"
);
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", (error) => console.log("Error occurred:", error));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/bookRoute", bookRoute);
app.use("/contactRoute", contactRoute);
app.use("/cancelRoute", cancelRoute);
app.use("/", authRoute); // Use the authRoute for login
app.listen(4000, () => {
  console.log("server started at 4000");
});
