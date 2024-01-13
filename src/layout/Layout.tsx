import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const Component: React.FC = () => {
  return (
    <main>
      <header className="flex justify-between mb-4">
        <h3>Library</h3>

        <div className="flex gap-4">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/books">Books</NavLink>
          <NavLink to="/users">Users</NavLink>
        </div>

        <div />
      </header>

      <Outlet />
    </main>
  );
};
