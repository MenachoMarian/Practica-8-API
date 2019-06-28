const mongoose = require("./connect");
var USERSCHEMA = {
  nombre:     String,
}

const USER = mongoose.model("user", USERSCHEMA);
module.exports = {model: USER, schema: USERSCHEMA};
