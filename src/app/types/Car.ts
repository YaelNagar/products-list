import Document from "mongoose";
export default interface Car extends Document {
  _id: string;
  car_number: string;
  name: string;
  manufacturer: string;
  year: string;
  image: string;
}
