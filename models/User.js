const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email: {type: String},
    password: {type: String}

});

module.exports = mongoose.model("users", userSchema);
