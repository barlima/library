import React from "react";
import { NavLink, useParams } from "react-router-dom";

import { generatePath, useData } from "../../../../services/routing";
import { User } from "../../../../features/users";

export const Component: React.FC = () => {
  const user = useData<User>();
  const { tab } = useParams<{ id: string; tab: string }>();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-4xl">{user.name}</h1>
        <h5 className="font-thin text-xl">{user.email}</h5>
      </div>

      <div className="flex gap-2">
        <NavLink to={generatePath("/users/:id", { id: user.id.toString() })}>
          Overview
        </NavLink>
        <NavLink
          to={generatePath("/users/:id/:tab?", {
            id: user.id.toString(),
            tab: "address",
          })}
        >
          Address
        </NavLink>
        <NavLink
          to={generatePath("/users/:id/:tab?", {
            id: user.id.toString(),
            tab: "history",
          })}
        >
          History
        </NavLink>
      </div>

      {tab === "" && <div>{user.website}</div>}

      {tab === "history" && <h4>History</h4>}

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
