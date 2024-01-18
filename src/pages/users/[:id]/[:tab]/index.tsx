import React from "react";
import { NavLink, useParams } from "react-router-dom";

import { User } from "../../../../features/users";
import { useFetch } from "../../../../services/api";
import { generatePath } from "../../../../services/routing";
import { History, HistoryCard } from "../../../../features/history";

export const Component: React.FC = () => {
  const { tab, id } = useParams<{ id: string; tab: string }>();

  const {
    data: [user],
    loading: userLoading,
  } = useFetch<User>("/users.json", (data) =>
    data.filter((d) => d.id.toString() === id)
  );

  const { data: userHistory, loading: historyLoading } = useFetch<History>(
    "/history.json",
    (data) => data.filter((d) => d.userId.toString() === id)
  );

  if (userLoading || historyLoading) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-4xl">{user.name}</h1>
        <h5 className="font-thin text-xl">{user.email}</h5>
      </div>

      <div className="flex gap-2">
        <NavLink
          className="border-solid border-[1px] border-pink-600 px-2"
          to={generatePath("/users/:id", { id: user.id.toString() })}
        >
          Overview
        </NavLink>
        <NavLink
          className="border-solid border-[1px] border-pink-600 px-2"
          to={generatePath("/users/:id/:tab?", {
            id: user.id.toString(),
            tab: "address",
          })}
        >
          Address
        </NavLink>
        <NavLink
          className="border-solid border-[1px] border-pink-600 px-2"
          to={generatePath("/users/:id/:tab?", {
            id: user.id.toString(),
            tab: "history",
          })}
        >
          History
        </NavLink>
      </div>

      {tab === "" && <div>{user.website}</div>}

      {tab === "history" && (
        <div>
          <h4>History</h4>

          {userHistory.map((item) => (
            <HistoryCard key={item.id} history={item} />
          ))}
        </div>
      )}

      {tab === "address" && (
        <div>
          <p>{user.address?.street + user.address?.suite}</p>
          <p>{user.address?.city}</p>
          <p>{user.address?.zipcode}</p>
        </div>
      )}
    </div>
  );
};
