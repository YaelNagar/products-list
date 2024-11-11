import React from "react";
import { CarsCardProps } from "@/app/types/CarsCardProps";

const BookCard: React.FC<CarsCardProps> = ({
  car,
  onDelete,
  onEdit,
  isEditing,
  editedCarData,
  onSaveEdit,
  onInputChange,
}) => {
  return (
    <div className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img
          className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
          src={car.image}
          alt="car"
        />
      </div>
      <div className="p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedCarData.car_number}
              onChange={(e) => onInputChange(e, "car_number")}
              className="text-slate-600 leading-normal font-light border p-2 rounded-md"
            />
            <input
              type="text"
              value={editedCarData.name}
              onChange={(e) => onInputChange(e, "name")}
              className="mb-2 text-slate-800 text-xl font-semibold border p-2 rounded-md"
            />
          </>
        ) : (
          <>
            <h6 className="mb-2 text-slate-800 text-xl font-semibold">
              {car.car_number}
            </h6>
            <p className="text-slate-600 leading-normal font-light">
              {car.name}
            </p>
          </>
        )}
      </div>
      <div className="px-4 pb-4 pt-0 mt-2">
        {isEditing ? (
          <button
            onClick={onSaveEdit}
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg m-2"
          >
            Save Changes
          </button>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg m-2"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg m-2"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
