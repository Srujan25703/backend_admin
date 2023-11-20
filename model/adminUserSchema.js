const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "admin_user",
  }
);

// // Hash the password before saving it to the database
// adminUserSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// Export the Mongoose model with a name that represents the model
module.exports = mongoose.model("adminUserSchema", adminUserSchema);
