import connect from "@/app/lib/db/mongoDB";
import Car from "@/app/lib/models/cars";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const cars = await Car.find();
    return NextResponse.json(cars);
  } catch (error) {
    throw new Error("error" + error);
  }
}

export async function POST(request: Request) {
  try {
    await connect();
    const {car_number, name, manufacturer ,year,image } = await request.json(); 
    const newCar = new Car({ car_number, name, manufacturer ,year ,image});
    await newCar.save(); 
    return NextResponse.json({
      message: "Car added successfully", 
      car: {
        car_number, name, manufacturer ,year ,image
      },
    });
  } catch (error) {
    console.error("Error adding car:", error); 
    return NextResponse.json(
      { message: "Error adding car", error: error },
      { status: 500 } 
    );
  }
}


