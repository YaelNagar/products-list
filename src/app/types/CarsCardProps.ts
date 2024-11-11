import Car from "@/app/types/Car";

export interface CarsCardProps {
  car: Car;
  onDelete?: () => void;
  onEdit?: () => void;
  isEditing: boolean;
  editedCarData: {
    car_number: string;
    name: string;
    manufacturer: string;
    year: string;
    image: string;
  };
  onSaveEdit: () => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "car_number"
  ) => void;
}
