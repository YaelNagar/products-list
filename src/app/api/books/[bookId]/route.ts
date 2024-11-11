import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/books";
import { Params } from "next/dist/server/request/params";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const { bookId } = await params;
    console.log(params);
    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    await book.deleteOne();
    const updatedBooks = await Book.find();
    return NextResponse.json(
      { message: "Book deleted successfully", books: updatedBooks },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting book: " + error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const { bookId } = await params;
    console.log(bookId);
    if (!bookId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }
    const { name, author } = await request.json();
    const book = await Book.findById(bookId);
    if (!book) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }
    book.name = name || book.name;
    book.author = author || book.author;
    await book.save();
    return NextResponse.json({
      message: "Book updated successfully",
      book: {
        id: book._id,
        name: book.name,
        author: book.author,
      },
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { message: "Error updating book: ", error: error },
      { status: 500 }
    );
  }
}
