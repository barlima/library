import React from "react";
import { History } from "../types/History";
import { Link } from "react-router-dom";
import { generatePath } from "../../../services/routing";

export const HistoryCard: React.FC<{ history: History }> = ({ history }) => {
  return (
    <div className="flex gap-2">
      <span>
        {history.startDate} - {history.returnDate}
      </span>
      <Link
        to={generatePath("/users/:id", { id: history.userId.toString() })}
        className="text text-pink-600"
      >
        User
      </Link>
      <Link
        to={generatePath("/books/:id", { id: history.bookId.toString() })}
        className="text text-pink-600"
      >
        Book
      </Link>
    </div>
  );
};
