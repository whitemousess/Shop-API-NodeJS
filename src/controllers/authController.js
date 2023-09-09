const jwt = require("jsonwebtoken");

const authModel = require("../models/AuthModel");

class authController {
  getAll(req, res, next) {
    authModel.find({}).then((account) => {
      res.json(account);
    });
  }

  currentUser(req, res, next) {
    res.json({ data: req.account });
  }

  // handle login
  login(req, res, next) {
    const { username, password } = req.body;
    authModel
      .findOne({ username, password })
      .then((account) => {
        if (!account) {
          return res
            .status(404)
            .json({ message: "Invalid username or password" });
        } else {
          var token = jwt.sign({ _id: account._id }, "pets");
          return res.json({
            message: "Login is success",
            data: account,
            token: token,
            role: account.role,
          });
        }
      })
      .catch((err) => {
        res.status(404).json({ err });
      });
  }

  // handle register
  register(req, res, next) {
    req.body.role = 1;
    const { username } = req.body;
    authModel.findOne({ username }).then((account) => {
      if (account) {
        res.status(409).json({ message: "username already taken" });
      } else {
        const account = new authModel(req.body);
        account
          .save()
          .then((account) => {
            res.status(201).json({ data: account });
          })
          .catch(next);
      }
    });
  }

  currentEdit(req, res, next) {
    if (!req.file) {
      req.body.avatar = req.account.avatar;
    } else {
      req.body.avatar = req.file.path;
    }
    
    authModel
      .updateOne({ _id: req.account._id }, req.body)
      .then(() => {
        authModel.findOne({ _id: req.account._id })
          .then((account) => {
            if (!account) {
              // Xử lý tài khoản không tồn tại
              return res.status(404).json({ error: "Tài khoản không tồn tại" });
            }
            // Trả về tất cả thông tin vừa sửa
            res.json({ data: account });
          })
          .catch(next);
      })
      .catch(next);
  }
}

module.exports = new authController();
