const PetModel = require("../models/PetModel");
const cloudinary = require("../config/db/cloudinary");

class CatController {
  GetPage(req, res) {
    const { page, per_page, q, type } = req.query;
    const objWhere = {};

    // Kiểm tra và áp dụng các điều kiện tìm kiếm nếu có
    if (q) objWhere.name = new RegExp(q, "i");
    if (type) objWhere.type = new RegExp(type, "i");

    PetModel.find(objWhere)
      .sort({ _id: -1 })
      .then((pets) => {
        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(per_page) || pets.length; // Giá trị mặc định là 10
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const totalItems = pets.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Giới hạn dữ liệu dựa trên trang và số lượng mục trên mỗi trang
        const items = pets.slice(startIndex, endIndex);

        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((error) => {
        console.error("Lỗi trong quá trình truy vấn dữ liệu: ", error);
        res
          .status(500)
          .json({ error: "Đã xảy ra lỗi trong quá trình truy vấn dữ liệu." });
      });
  }

  GetPet(req, res, next) {
    PetModel.findOne({ _id: req.params.id }).then((pets) => {
      res.json({ data: pets });
    });
  }

  PetCreate(req, res, next) {
    if (!req.file) {
      req.body.image = null;
    } else {
      req.body.image = req.file.path;
    }
    const pets = new PetModel(req.body);
    pets
      .save()
      .then((pet) => res.json(pet))
      .catch(next);
  }

  PetEdit(req, res, next) {
    PetModel.findOne({ _id: req.params.id }).then((pet) => {
      const image_id =
        "pets" + pet.image.split("/upload/")[1].split("/pets")[1].split(".")[0];
      if (pet) {
        if (!req.file) {
          req.body.image = pet.image;
        } else {
          req.body.image = req.file.path;
          cloudinary.uploader.destroy(image_id);
        }
        PetModel.updateOne({ _id: req.params.id }, req.body)
          .then((pet) => res.json({ data: pet }))
          .catch(next);
      } else {
        res.json({ error: "Not found" });
      }
    });
  }

  PetDelete(req, res, next) {
    PetModel.findOneAndDelete({ _id: req.params.id }).then((pet) => {
      if (pet) {
        const image_id =
          "pets" +
          pet.image.split("/upload/")[1].split("/pets")[1].split(".")[0];
        cloudinary.uploader.destroy(image_id);
        res.json({ data: pet });
      } else {
        res.json({ error: "Not found" });
      }
    });
  }
}

module.exports = new CatController();
