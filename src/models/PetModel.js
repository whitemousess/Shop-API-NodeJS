const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pet = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String },
    type: { type: String, required: true},
    description: { type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pets", Pet);