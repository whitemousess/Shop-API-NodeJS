const PetModel = require("../models/PetModel");

class CatController {
  // task get all the pets
  GetAllPet(req, res, next) {
    // paging
    let PAGE_SIZE = req.query.per_page;
    let page = req.query.page;
    let params = [];
    let objWhere = {};

    // paging
    params.per_page = PAGE_SIZE;
    params.page = page;
    params.q = req.query.q;
    params.type = req.query.type;

    page = parseInt(page);
    var sotrangboqua = (page - 1) * PAGE_SIZE;

    // search for items
    if (params.q !== "") objWhere.name = new RegExp(params.q, "i");
    if (params.type !== "") objWhere.type = new RegExp(params.type, "i");

    PetModel.find(objWhere)
      .sort({ _id: -1 })
      .skip(sotrangboqua)
      .limit(PAGE_SIZE)
      .then((pets) => {
        res.json({ data: pets });
      });
  }

  GetPet(req, res, next) {
    PetModel.findOne({ _id: req.params.id }).then((pets) => {
      res.json({ data: pets });
    });
  }

  PetCreate(req, res, next) {
    const pets = new PetModel(req.body);
    pets
      .save()
      .then((pet) => res.json(pet))
      .catch(next);
  }

  PetEdit(req, res, next) {
    PetModel.updateOne({ _id: req.params.id }, req.body)
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }

  PetDelete(req, res, next) {
    PetModel.deleteOne({ _id: req.params.id })
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }
}

module.exports = new CatController();
