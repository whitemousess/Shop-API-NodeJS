const mongoose = require("mongoose");
const schema = mongoose.Schema;

const auth = new schema(
  {
    email: {
      type: String,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    username: { type: String, trim: true, minLength: 2, maxLength: 100 },
    firstName: { type: String},
    lastName: { type: String},
    password: { type: String },
    role: { type: Number },
    avatar: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("accounts", auth);
