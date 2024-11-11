import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
