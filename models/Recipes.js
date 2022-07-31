const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let recipeShema = new Schema({

    name: String,
    ingredients: [String],
    instructions: [String],
    categories: [String],
    images: [String]
});


module.exports = mongoose.model("Recipes", recipeShema);

