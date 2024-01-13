import { generatePath as genPath } from "react-router-dom";
import { routes } from "./router";

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

type GeneratePathParams<T extends string> = Parameters<typeof genPath<T>>[1];

type RoutesWithTabs = {
  [K in AvailableRoutes]: K extends `${string}/:tab${string | ""}` ? K : never;
}[AvailableRoutes];

const possibleTabs = {
  "/books/:id/:tab?": ["", "history"],
  "/users/:id/:tab?": ["", "address", "history"],
} as const satisfies Record<RoutesWithTabs, Readonly<string[]>>;

export const generatePath = <TRoute extends AvailableRoutes>(
  path: TRoute,
  params: GeneratePathParams<TRoute>
) => {
  return genPath(path, params);
};
