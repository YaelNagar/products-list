import Document from "mongoose";
export default interface User extends Document {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  password: string;
}
