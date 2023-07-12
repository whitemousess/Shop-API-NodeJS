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
    params.per_page = PAGE_SIZE
    params.page = page
    params.q = req.query.q;

    page = parseInt(page);
    var sotrangboqua  = (page - 1) * PAGE_SIZE;

    // search for items
    if (params.q !== "") objWhere.name = new RegExp(params.q, "i");

    PetModel.find(objWhere)
    .sort({_id: -1})
    .skip(sotrangboqua)
    .limit(PAGE_SIZE)
    .then((pets) => res.json({data: pets}))
  }

  DogPets(req, res, next) {
    PetModel.find({ type: "dog" })
      .sort({ _id: -1 })
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }

  DogCreate(req, res, next) {
    req.body.type = "dog";
    const pets = new PetModel(req.body);
    pets
      .save()
      .then((pet) => res.json(pet))
      .catch(next);
  }

  DogEdit(req, res, next) {
    PetModel.updateOne({ _id: req.params.id }, req.body)
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }

  DogDelete(req, res, next) {
    PetModel.deleteOne({ _id: req.params.id })
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }

  CatPets(req, res, next) {
    PetModel.find({ type: "cat" })
      .sort({ _id: -1 })
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }

  CatCreate(req, res, next) {
    req.body.type = "cat";
    const pets = new PetModel(req.body);
    pets
      .save()
      .then((pet) => res.json(pet))
      .catch(next);
  }

  CatEdit(req, res, next) {
    PetModel.updateOne({ _id: req.params.id }, req.body)
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }

  CatDelete(req, res, next) {
    PetModel.deleteOne({ _id: req.params.id })
      .then((pets) => res.json({ data: pets }))
      .catch(next);
  }
}

module.exports = new CatController();
