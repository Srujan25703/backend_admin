const express = require("express");
const contactSchema = require("../model/contactSchema");
const { default: mongoose } = require("mongoose");
const contactRoute = express.Router();

contactRoute.post("/create-contact", (req, res) => {
  console.log("Received request:", req.body);
  contactSchema.create(req.body, (err, data) => {
    if (err) {
      console.error("Error creating contact:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("contact created:", data);
    res.json(data);
  });
});

contactRoute.get("/", (req, res) => {
  contactSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});
contactRoute
  .route("/update-contact/:id")
  .get((req, res) => {
    bookSchema.find(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) return err;
      else res.json(data);
    });
  })
  .put((req, res) => {
    contactRoute.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  });
contactRoute.delete("/delete-contact/:id", (req, res) => {
  contactSchema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});
module.exports = contactRoute;
