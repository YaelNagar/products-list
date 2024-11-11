"use client";
import React, { useState, useEffect } from "react";
import CarCard from "@/app/components/CarCard";
import {
  getAllCars,
  editCar,
  deleteCar,
  addNewCar,
} from "@/app/services/carsService";
import Car from "@/app/types/Car";

const BooksList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [addOrEdit, setAddOrEdit] = useState(false);
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [editedCarData, setEditedCarData] = useState<{
    car_number: string;
    name: string;
    manufacturer: string;
    year: string;
    image: string;
  }>({
    car_number: "",
    name: "",
    manufacturer: "",
    year: "",
    image: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchBooks();
  }, [addOrEdit, editingCarId]);

  const handleEdit = (_id: string) => {
    setEditingCarId(_id);
    const carToEdit = cars.find((car) => car._id === _id);
    if (carToEdit) {
      setEditedCarData({
        car_number: carToEdit.car_number,
        name: carToEdit.name,
        manufacturer: carToEdit.manufacturer,
        year: carToEdit.year,
        image: carToEdit.image,
      });
    }
  };

  const handleSaveEdit = async (_id: string) => {
    try {
      const updatedCar = await editCar(
        _id,
        editedCarData.car_number,
        editedCarData.name,
        editedCarData.manufacturer,
        editedCarData.year,
        editedCarData.image,
      );
      setCars((prevBooks) =>
        prevBooks.map((car) => (car._id === _id ? updatedCar : car))
      );
      setEditingCarId(null);
      setAddOrEdit(true);
    } catch (error) {
      console.error("Error saving the car:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedCarData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDelete = async (_id: string) => {
    await deleteCar(_id);
    setCars((prevCars) => prevCars.filter((car) => car._id !== _id));
  };

  const handleAddCar = async () => {
    console.log("Adding a new book");
    try {
      const newCar = await addNewCar({
        car_number: "new number",
        name: "new name",
        manufacturer: "new manufacturer",
        year: "new year",
        image:
          "https://media.cdn-jaguarlandrover.com/api/v2/images/55880/w/680",
      });
      setCars([...cars, newCar]);
      setAddOrEdit(true);
    } catch (error) {
      console.error("Error saving the car:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleAddCar}
        className="fixed top-20 right-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg z-50"
      >
        +
      </button>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <CarCard
              key={index}
              car={car}
              onDelete={() => handleDelete(car._id)}
              onEdit={() => handleEdit(car._id)}
              isEditing={editingCarId === car._id}
              editedCarData={editedCarData}
              onSaveEdit={() => handleSaveEdit(car._id)}
              onInputChange={handleInputChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BooksList;
