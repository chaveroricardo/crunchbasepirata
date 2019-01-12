const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  lastname: String,
  nationality: String,
  birthday: Date,
  pictureUrl: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Author = mongoose.model("Book", bookSchema);

module.exports = Author;