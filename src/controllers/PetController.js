const PetModel = require("../models/PetModel");

class CatController {
  GetPage(req, res, next) {
    let params = [];
    let objWhere = {};
    const { page, per_page } = req.query;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = per_page;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    params.q = req.query.q;
    params.type = req.query.type;

    // search for items
    if (params.q !== "") objWhere.name = new RegExp(params.q, "i");
    if (params.type !== "") objWhere.type = new RegExp(params.type, "i");

    PetModel.find(objWhere)
      .sort({ _id: -1 })
      .then((pets) => {
        const items = pets.slice(startIndex, endIndex);
        const totalItems = pets.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      });
  }

  GetPet(req, res, next) {
    PetModel.findOne({ _id: req.params.id }).then((pets) => {
      res.json({ data: pets });
    });
  }

  PetCreate(req, res, next) {
    req.body.image = req.file.path;
    const pets = new PetModel(req.body);
    pets
      .save()
      .then((pet) => res.json(pet))
      .catch(next);
  }

  PetEdit(req, res, next) {
    if (!req.file) {
      PetModel.findOne({ _id: req.params.id }).then((data) => {
        req.body.image = data.image;
        PetModel.updateOne({ _id: req.params.id }, req.body)
          .then((pet) => res.json({ data: pet }))
          .catch(next);
      });
    } else {
      req.body.image = req.file.path;
      PetModel.updateOne({ _id: req.params.id }, req.body)
        .then((pet) => res.json({ data: pet }))
        .catch(next);
    }
  }

  PetDelete(req, res, next) {
    PetModel.deleteOne({ _id: req.params.id })
      .then((pets) => res.json({ data: pets }))
      .catch((error) => res.json({ error: error }));
  }
}

module.exports = new CatController();
