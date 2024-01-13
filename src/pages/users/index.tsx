import React from "react";

import { useData, generatePath } from "../../services/routing";
import { User } from "../../features/users";

export const Component: React.FC = () => {
  const users = useData<User[]>();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-4xl">Users</h2>

      {users && (
        <ul className="flex flex-col gap-4">
          {users.map((user) => (
            <a key={user.id} href={generatePath("/users/:id", { id: user.id })}>
              <li className="border-solid border-[1px] border-pink-600 p-2 px-4 flex flex-col justify-between">
                <h6 className="font-thin text-md block">{user.email}</h6>
                <h4 className="font-medium text-xl block">{user.name}</h4>
              </li>
            </a>
          ))}
        </ul>
      )}
    </section>
  );
};
