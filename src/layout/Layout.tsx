import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Component: React.FC = () => {
  return (
    <main>
      <header className="flex justify-evenly p-4 mb-4 border-solid border-b-[1px] border-pink-600">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/users">Users</NavLink>
      </header>

      <Outlet />
    </main>
  );
};
