const book_model = require("./book_model");

// Read book details
const read_book = async (id) => {
  try {
    if (id) {
      if (id.length !== 24) {
        return null; // Invalid ID length
      }
      const result = await book_model.findById(id);
      return result;
    } else {
      const result = await book_model.find();
      return result;
    }
  } catch (err) {
    throw err;
  }
};

// Create a new book
const create_book = async (book_detail) => {
  try {
    const book = new book_model(book_detail);
    const result = await book.save();
    return result;
  } catch (err) {
    throw err;
  }
};

// Update an existing book
const update_book = async (id, update_detail) => {
  try {
    const book = await read_book(id);
    if (book) {
      const result = await book_model.updateOne(
        { _id: id },
        { $set: update_detail }
      );
      return `Book with id ${id} updated successfully`;
    } else {
      return `No book found with id ${id} in the database`;
    }
  } catch (err) {
    throw err;
  }
};

// Delete a book
const delete_book = async (id) => {
  try {
    const book = await read_book(id);
    if (book) {
      const result = await book_model.deleteOne({ _id: id });
      return `Book with id ${id} deleted successfully`;
    } else {
      return `No book found with id ${id} in the database`;
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  read_book: read_book,
  create_book: create_book,
  update_book: update_book,
  delete_book: delete_book,
};
