"use client";
import React, { useState, useEffect } from "react";
import BookCard from "@/app/components/BookCard";
import {
  getAllBooks,
  editBook,
  deleteBook,
  addNewBook,
} from "@/app/services/booksService";
import Book from "@/app/types/Book";

const BooksList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [addOrEdit, serAddOrEdit] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editedBookData, setEditedBookData] = useState<{
    name: string;
    author: string;
  }>({
    name: "",
    author: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [addOrEdit, editingBookId]);

  const handleEdit = (_id: string) => {
    setEditingBookId(_id);
    const bookToEdit = books.find((book) => book._id === _id);
    if (bookToEdit) {
      setEditedBookData({ name: bookToEdit.name, author: bookToEdit.author });
    }
  };

  const handleSaveEdit = async (_id: string) => {
    try {
      const updatedBook = await editBook(
        _id,
        editedBookData.name,
        editedBookData.author
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === _id ? updatedBook : book))
      );
      setEditingBookId(null);
      serAddOrEdit(true);
    } catch (error) {
      console.error("Error saving the book:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedBookData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDelete = async (_id: string) => {
    await deleteBook(_id);
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== _id));
  };

  const handleAddBook = async () => {
    console.log("Adding a new book");
    try {
      const newBook = await addNewBook({
        name: "new name",
        author: "new author",
        image:
          "https://images.unsplash.com/photo-1496436818536-e239445d3327?q=80&w=1200",
      });
      setBooks([...books, newBook]);
      serAddOrEdit(true);
    } catch (error) {
      console.error("Error saving the book:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddBook}
        className="fixed top-20 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg z-50"
      >
        +
      </button>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              onDelete={() => handleDelete(book._id)}
              onEdit={() => handleEdit(book._id)}
              isEditing={editingBookId === book._id}
              editedBookData={editedBookData}
              onSaveEdit={() => handleSaveEdit(book._id)}
              onInputChange={handleInputChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksList;
