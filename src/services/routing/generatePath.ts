import { PathParam, generatePath as genPath } from "react-router-dom";
import { routes } from "./router";

// Paths preparation

type Route = {
  path?: string;
  index?: boolean;
  children?: Readonly<Route[]>;
};

type RemoveInitialBackslash<T extends string> = T extends `/${infer U}` ? U : T;
type RemoveTrailingBackslash<T extends string> = T extends `${infer U}/`
  ? U
  : T;

type GetAvailableRoutes<TRouter extends Route> = TRouter["path"] extends string
  ? TRouter["children"] extends Readonly<Array<infer TChildren>>
    ? TChildren extends Route
      ? `${RemoveInitialBackslash<
          TRouter["path"]
        >}/${GetAvailableRoutes<TChildren>}`
      : never
    : TRouter["index"] extends true
    ? TRouter["path"] | ""
    : TRouter["path"]
  : "";

type AvailableRoutes = RemoveTrailingBackslash<
  GetAvailableRoutes<typeof routes>
>;

// Function preparation

// Option 1
// type GeneratePathParams<T extends string> = Parameters<typeof genPath<T>>[1];

// Option 2
type RoutesWithTabs = {
  [K in AvailableRoutes]: K extends `${string}/:tab${string | ""}` ? K : never;
}[AvailableRoutes];

// Tabs preparation

const possibleTabs = {
  "/books/:id/:tab?": ["", "history", "reviews"],
  "/users/:id/:tab?": ["", "address", "history", "reviews"],
} as const satisfies Record<RoutesWithTabs, Readonly<string[]>>;

type InferRoot<T extends string> = T extends `/${infer TRoot}/:id/${string}`
  ? TRoot
  : never;

export type PossibleTabs = {
  [K in keyof typeof possibleTabs as InferRoot<K>]: (typeof possibleTabs)[K][number];
};

// Final function

type Params<TRoute extends AvailableRoutes> = {
  [key in PathParam<TRoute>]: key extends "tab"
    ? TRoute extends RoutesWithTabs
      ? (typeof possibleTabs)[TRoute][number]
      : never
    : string | null;
};

export const generatePath = <TRoute extends AvailableRoutes>(
  path: TRoute,
  params: Params<TRoute>
) => {
  return genPath(path, params);
};
