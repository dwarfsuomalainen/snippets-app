const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let categoryShema = new Schema({
    name: String
}, {collection: "categories"});


module.exports = mongoose.model("Categories", categoryShema);
