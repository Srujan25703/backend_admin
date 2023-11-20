const express = require("express");
const cancelSchema = require("../model/cancelSchema");
const { default: mongoose } = require("mongoose");
const cancelRoute = express.Router();

cancelRoute.post("/create-cancel", (req, res) => {
  console.log("Received request:", req.body);
  cancelSchema.create(req.body, (err, data) => {
    if (err) {
      console.error("Error creating cancel:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("cancel created:", data);
    res.json(data);
  });
});

cancelRoute.get("/", (req, res) => {
  cancelSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});
cancelRoute
  .route("/update-cancel/:id")
  .get((req, res) => {
    cancelSchema.find(mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) return err;
      else res.json(data);
    });
  })
  .put((req, res) => {
    cancelRoute.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  });
cancelRoute.delete("/delete-cancel/:id", (req, res) => {
  cancelSchema.findByIdAndRemove(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});
module.exports = cancelRoute;
