const Express = require("express");
const BodyParser = require("body-parser");
const app = Express();
require("dotenv").config();
app.use(BodyParser.json());

const mongoose = require("mongoose");

const sportroutes = require("./routes/sport");
app.use('/sport', sportroutes);

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

module.exports = app;
