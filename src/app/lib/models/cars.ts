import mongoose, { Schema } from "mongoose";

const carSchema = new Schema({
  car_number: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  year: { type: String, required: true },
  image: { type: String, required: true },
});

const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

export default Car;
