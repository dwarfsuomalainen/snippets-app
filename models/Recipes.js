const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let recipeShema = new Schema({
  name: String,
  ingredients: [String],
  instructions: [String],
  categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
  images: [String],
  createdBy: { type: Schema.Types.ObjectId, ref: "users" },
  comments: [
    {
      commentBody: String,
      //userCommented: String,
      createdBy: { type: Schema.Types.ObjectId, ref: "users" },
      commentedOn: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Recipes", recipeShema);
