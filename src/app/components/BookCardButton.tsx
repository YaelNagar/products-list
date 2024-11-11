import React from "react";
import { ButtonProps } from "@/app/types/buttonProps";

const BookCardButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center space-x-2 ${className}`}
    >
      <span>{text}</span>
    </button>
  );
};

export default BookCardButton;
