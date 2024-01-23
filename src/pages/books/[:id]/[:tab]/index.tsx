import React from "react";
import { NavLink, useParams } from "react-router-dom";

import { Book } from "../../../../features/books";
import { useFetch } from "../../../../services/api";
import { History, HistoryCard } from "../../../../features/history";
import { PossibleTabs, generatePath } from "../../../../services/routing";

export const Component: React.FC = () => {
  const { tab, id } = useParams<{ id: string; tab: PossibleTabs["books"] }>();
  const {
    data: [book],
    loading,
  } = useFetch<Book>("/books.json", (data) =>
    data.filter((d) => d.id.toString() === id)
  );

  const { data: bookHistory, loading: historyLoading } = useFetch<History>(
    "/history.json",
    (data) => data.filter((d) => d.bookId.toString() === id)
  );

  if (loading || historyLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-4xl">{book.title}</h1>
        <h3 className="text-2xl">{book.author}</h3>
        <h5 className="font-thin text-xl">{book.year}</h5>
      </div>

      <div className="flex gap-4 w-min after:border-solid ">
        <NavLink
          className="border-solid border-[1px] border-pink-600 px-2"
          to={generatePath("/books/:id", { id: book.id.toString() })}
        >
          Overview
        </NavLink>
        <NavLink
          className="border-solid border-[1px] border-pink-600 px-2"
          to={generatePath("/books/:id/:tab?", {
            id: book.id.toString(),
            tab: "history",
          })}
        >
          History
        </NavLink>
        <NavLink
          className="border-solid border-[1px] border-pink-600 px-2"
          to={generatePath("/books/:id/:tab?", {
            id: book.id.toString(),
            tab: "reviews",
          })}
        >
          Reviews
        </NavLink>
      </div>

      {tab === "history" && (
        <div>
          <h4>History</h4>

          {bookHistory.map((item) => (
            <HistoryCard key={item.id} history={item} />
          ))}
        </div>
      )}

      {tab === "reviews" && <h4>Reviews</h4>}

      {!tab && (
        <img
          width={320}
          src={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
        />
      )}
    </div>
  );
};
