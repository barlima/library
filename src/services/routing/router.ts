import { LoaderFunction, createBrowserRouter } from "react-router-dom";
import { request } from "../api";

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
          loader: async () => request("/books.json"),
        },
        {
          path: ":id",
          children: [
            {
              index: true,
              path: ":tab?",
              lazy: () => import("../../pages/books/[:id]/[:tab]"),
              loader: (async ({ params }) =>
                request(`/books.json?id=${params.id}`)) as LoaderFunction<any>,
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
          loader: async () => request("/users.json"),
        },
        {
          path: ":id",
          children: [
            {
              index: true,
              path: ":tab?",
              lazy: () => import("../../pages/users/[:id]/[:tab]"),
              loader: (async ({ params }) =>
                request(`/users.json?id=${params.id}`)) as LoaderFunction<any>,
            },
          ],
        },
      ],
    },
  ],
} as const;

export const router = createBrowserRouter([
  {
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
            loader: async () => request("/books.json"),
          },
          {
            path: ":id",
            children: [
              {
                path: ":tab?",
                lazy: () => import("../../pages/books/[:id]/[:tab]"),
                loader: async ({ params }) =>
                  request(`/books.json?id=${params.id}`),
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
            loader: async () => request("/users.json"),
          },
          {
            path: ":id",
            children: [
              {
                path: ":tab?",
                lazy: () => import("../../pages/users/[:id]/[:tab]"),
                loader: (async ({ params }) =>
                  request(
                    `/users.json?id=${params.id}`
                  )) as LoaderFunction<any>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
