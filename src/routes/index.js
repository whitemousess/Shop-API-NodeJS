const petsRouter = require("./pets");
const accountRouter = require("./account");
const shopRouter = require("./Shop");

function route(app) {
  app.use("/api/account", accountRouter);
  app.use("/api/pet", petsRouter);
  app.use("/api/shop", shopRouter);
    
  app.use("/", function (req, res, next) {
    res.status(404).json({
      message: "404 Not Found",
      status_code: 404,
    });
  });
}

module.exports = route;
