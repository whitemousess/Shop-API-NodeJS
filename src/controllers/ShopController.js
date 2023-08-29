const ShopModel = require("../models/ShopModel");
const PetModel = require("../models/PetModel");

class ShopController {
  getToCard(req, res, next) {
    ShopModel.find({ id_User: req.account._id })
      .then((data) => res.json({ data: data }))
      .catch(next);
  }

  addToCard(req, res, next) {
    req.body.id_User = req.account._id;

    PetModel.findOne({ _id: req.body.shop_product })
      .then((data) => {
        req.body.shop_product = data;
        const Shop = new ShopModel(req.body);
        Shop.save()
          .then((data) => res.json({ data: data }))
          .catch((error) => res.json({ error: error }));
      })
      .catch((error) => res.json({ error: error }));
  }

  deleteToCard(req, res, next) {
    ShopModel.findOneAndDelete({ _id: req.params.id })
      .then((cart) => {
        res.json({ data: cart });
      })
      .catch((error) => res.json({ error: "Không tìm thấy đơn hàng" }));
  }
}

module.exports = new ShopController();
