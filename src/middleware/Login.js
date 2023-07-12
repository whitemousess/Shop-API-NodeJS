const jwt = require("jsonwebtoken");
const AuthModel = require('../models/AuthModel')
// middleware check to login
module.exports = function checkLogin(req, res, next) {
  try {
    var token = req.cookies.token;
    var ketqua = jwt.verify(token, "pets");

    AuthModel
      .findOne({ _id: ketqua._id })
      .then((account) => {
        if (account) {
          req.account = account;
          next();
        }
      })
      .catch((next) => res.status(500).json({ error: "error" }));
  } catch (error) {
    res.status(500).json({ error: "error token" })
}
}