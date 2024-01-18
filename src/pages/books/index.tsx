import React from "react";

import { Book, BookCard } from "../../features/books";
import { useFetch } from "../../services/api";

export const Component: React.FC = () => {
  const { data: books } = useFetch<Book>("/books.json");

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-4xl">Books</h2>

      {books && (
        <ul className="flex flex-wrap gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </ul>
      )}
    </section>
  );
};
