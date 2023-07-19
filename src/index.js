const express = require('express');
const cors = require('cors');
const db = require('./config/db')
const route = require('./routes');
const cookieParser = require("cookie-parser");

const app = express();
const port = 1407;

db.connect();

app.use(cors());
app.use(express.json());
// read token in cookie
app.use(cookieParser());

route(app);

app.listen(port, () =>
  console.log(`app listening at http://localhost:${port}`)
);
