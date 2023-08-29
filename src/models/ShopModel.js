const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shop = new Schema(
  {
    id_User: { type: String, required: true },
    shop_product: {
      name: { type: String },
      image: { type: String },
      type: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shops", Shop);
