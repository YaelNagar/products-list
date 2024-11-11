import Document from "mongoose";
export default interface Book extends Document {
  _id: string;
  name: string;
  author:string;
  image:string;
}
