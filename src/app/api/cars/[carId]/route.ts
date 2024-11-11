import connect from "@/app/lib/db/mongoDB";
import Car from "@/app/lib/models/cars";
import { Params } from "next/dist/server/request/params";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const { carId } = await params;
    console.log(params);
    if (!carId) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }
    const car = await Car.findById(carId);
    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    await car.deleteOne();
    const updatedCars = await Car.find();
    return NextResponse.json(
      { message: "Car deleted successfully", books: updatedCars },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting car: " + error },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    await connect();
    const { carId } = await params;
    console.log(carId);
    if (!carId) {
      return NextResponse.json(
        { message: "Car ID is required" },
        { status: 400 }
      );
    }
    const { car_number, name, manufacturer, year, image } =
      await request.json();
    const car = await Car.findById(carId);
    if (!car) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }
    car.car_number = car_number || car.car_number;
    car.name = name || car.name;
    car.manufacturer = manufacturer || car.manufacturer;
    car.year = year || car.year;
    car.image = image || car.image;
    await car.save();
    return NextResponse.json({
      message: "Car updated successfully",
      book: {
        id: car.car_number,
        name: car.name,
        manufacturer: car.manufacturer,
        year: car.year,
      },
    });
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { message: "Error updating car: ", error: error },
      { status: 500 }
    );
  }
}
