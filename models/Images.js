const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let imagesShema = new Schema({

    name: String,
    encoding: String,
    mimetype: String,
    buffer: Buffer
});

module.exports = mongoose.model("Images", imagesShema);