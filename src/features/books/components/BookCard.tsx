import React from "react";
import { Link } from "react-router-dom";

import { Book } from "../types/Book";
import { generatePath } from "../../../services/routing";

export const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <Link to={generatePath("/books/:id", { id: book.id.toString() })}>
      <li className="border-solid border-[1px] border-pink-600 p-2 px-4 flex flex-col justify-between">
        <h6 className="font-thin text-md block">{book.author}</h6>
        <h4 className="font-medium text-xl block">{book.title}</h4>
      </li>
    </Link>
  );
};
