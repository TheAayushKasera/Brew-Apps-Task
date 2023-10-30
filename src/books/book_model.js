const mongoose = require("mongoose");

const book_Schema = new mongoose.Schema({
  title: { type: "string", required: true },
  author: { type: "string", required: true },
  summary: { type: "string", required: true },
});

const book_model = new mongoose.model("books", book_Schema);

module.exports = book_model;
