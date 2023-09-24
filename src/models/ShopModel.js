const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shop = new Schema(
  {
    id_User: { type: String, required: true },
    shop_product: {type: mongoose.Schema.Types.ObjectId, ref: 'pets'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shops", Shop);
