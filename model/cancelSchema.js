const mongoose = require("mongoose");
const cancelSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    reason: { type: String },
  },
  {
    collection: "cancel",
  }
);
module.exports = mongoose.model("cancelSchema", cancelSchema);
