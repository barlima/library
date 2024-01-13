import React from "react";

import { Book } from "../../features/books";
import { useData, generatePath } from "../../services/routing";

export const Component: React.FC = () => {
  const books = useData<Book[]>();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-4xl">Books</h2>

      {books && (
        <ul className="flex flex-wrap gap-4">
          {books.map((book) => (
            <a key={book.id} href={generatePath("/books/:id", { id: book.id })}>
              <li className="border-solid border-[1px] border-pink-600 p-2 px-4 flex flex-col justify-between">
                <h6 className="font-thin text-md block">{book.author}</h6>
                <h4 className="font-medium text-xl block">{book.title}</h4>
              </li>
            </a>
          ))}
        </ul>
      )}
    </section>
  );
};
