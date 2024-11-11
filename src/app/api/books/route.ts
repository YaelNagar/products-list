import connect from "@/app/lib/db/mongoDB";
import Book from "@/app/lib/models/books";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const books = await Book.find();
    return NextResponse.json(books);
  } catch (error) {
    throw new Error("error" + error);
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const { name, author, image } = await request.json();
    const newBook = new Book({ name, author, image });
    await newBook.save();
    return NextResponse.json({
      message: "Book added successfully",
      book: {
        name,
        author,
        image
      },
    });
  } catch (error) {
    console.error("Error adding book:", error);
    return NextResponse.json(
      { message: "Error adding book", error: error },
      { status: 500 }
    );
  }
}
