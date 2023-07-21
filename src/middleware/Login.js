const jwt = require("jsonwebtoken");
const AuthModel = require('../models/AuthModel')
// middleware check to login
module.exports = function checkLogin(req, res, next) {
  try {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader && authorizationHeader.split(' ')[1]
    if (!token) res.status(403)

    jwt.verify(token, "pets" ,(err,data) => {
      // console.log(err, data)
      AuthModel
        .findOne({ _id: data._id })
        .then((account) => {
          if (account) {
            req.account = account;
            next();
          }
        })
        .catch((next) => res.status(500).json({ error: "error" }));
    });

  } catch (error) {
    res.status(500).json({ error: "error token" })
}
}