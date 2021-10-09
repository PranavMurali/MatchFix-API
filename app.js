const Express = require("express");
const BodyParser = require("body-parser");
const app = Express();
require("dotenv").config();
app.use(BodyParser.json());

const mongoose = require("mongoose");

const sportroutes = require("./routes/sport");
const bodyParser = require("body-parser");
app.use('/sport', sportroutes);

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(6969);
module.exports = app;
