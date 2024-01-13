import React from "react";
import { NavLink, useParams } from "react-router-dom";

import { generatePath, useData } from "../../../../services/routing";
import { Book } from "../../../../features/books";

export const Component: React.FC = () => {
  const book = useData<Book>();
  const { tab } = useParams<{ id: string; tab: string }>();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-4xl">{book.title}</h1>
        <h3 className="text-2xl">{book.author}</h3>
        <h5 className="font-thin text-xl">{book.year}</h5>
      </div>

      <div className="flex gap-2">
        <NavLink to={generatePath("/books/:id", { id: book.id.toString() })}>
          Overview
        </NavLink>
        <NavLink
          to={generatePath("/books/:id/:tab?", {
            id: book.id.toString(),
            tab: "history",
          })}
        >
          History
        </NavLink>
      </div>

      {tab ? (
        <h4>History</h4>
      ) : (
        <img
          width={320}
          src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
        />
      )}
    </div>
  );
};
