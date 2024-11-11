import axios from "axios";
import Book from "@/app/types/Book";

export const getAllBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get("/api/books");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const addNewBook = async (book: { name: string; author: string, image:string }) => {
  try {
    const response = await axios.post("/api/books", book, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "An error occurred");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};

export const deleteBook = async (id: string) => {
  try {
    const response = await axios.delete(`/api/books/${id}`);
    return response.data.books; 
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export const editBook = async (id: string, name: string, author: string) => {
  try {
    const response = await axios.put(`/api/books/${id}`, { name, author });
    return response.data;  // מחזיר את הספר המעודכן
  } catch (error) {
    console.error("Error editing book:", error);
    throw error;
  }
};
