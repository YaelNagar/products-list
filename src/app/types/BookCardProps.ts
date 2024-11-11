import Book from "@/app/types/Book";

export interface BookCardProps {
  book: Book;
  onDelete?: () => void;
  onEdit?: () => void;
  isEditing: boolean;
  editedBookData: {
    name: string;
    author: string;
  };
  onSaveEdit: () => void;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "name" | "author"
  ) => void;
}
