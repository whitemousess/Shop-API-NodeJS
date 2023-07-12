const express = require('express');
const db = require('./config/db')
const route = require('./routes');
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

db.connect();

app.use(express.json());
// read token in cookie
app.use(cookieParser());

route(app);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
