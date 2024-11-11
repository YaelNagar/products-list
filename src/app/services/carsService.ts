import axios from "axios";
import Car from "../types/Car";

export const getAllCars = async (): Promise<Car[]> => {
  try {
    const response = await axios.get("/api/cars");
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const addNewCar = async (car: {
  car_number: string;
  name: string;
  manufacturer: string;
  year: string;
  image: string;
}) => {
  try {
    const response = await axios.post("/api/cars", car, {
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

export const deleteCar = async (id: string) => {
  try {
    const response = await axios.delete(`/api/cars/${id}`);
    return response.data.cars;
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

export const editCar = async (
  id: string,
  car_number: string,
  name: string,
  manufacturer: string,
  year: string,
  image: string
) => {
  try {
    const response = await axios.put(`/api/cars/${id}`, {
      car_number,
      name,
      manufacturer,
      year,
      image
    });
    return response.data;
  } catch (error) {
    console.error("Error editing car:", error);
    throw error;
  }
};
