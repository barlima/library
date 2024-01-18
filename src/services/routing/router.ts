import { RouteObject, createBrowserRouter } from "react-router-dom";

export const routes = {
  path: "/",
  lazy: () => import("../../layout/Layout"),
  children: [
    {
      index: true,
      lazy: () => import("../../pages"),
    },
    {
      path: "books",
      children: [
        {
          index: true,
          lazy: () => import("../../pages/books"),
        },
        {
          path: ":id",
          children: [
            {
              index: true,
              path: ":tab?",
              lazy: () => import("../../pages/books/[:id]/[:tab]"),
            },
          ],
        },
      ],
    },
    {
      path: "users",
      children: [
        {
          index: true,
          lazy: () => import("../../pages/users"),
        },
        {
          path: ":id",
          children: [
            {
              index: true,
              path: ":tab?",
              lazy: () => import("../../pages/users/[:id]/[:tab]"),
            },
          ],
        },
      ],
    },
  ],
} as const;

const isRouteObject = (obj: unknown): obj is RouteObject => true;

export const router = createBrowserRouter([
  isRouteObject(routes) ? routes : {},
]);
